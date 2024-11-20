
from ultralytics import YOLO
import cv2
import numpy as np
from PIL import Image
from S3 import S3
import json
from dataclasses import dataclass
from color_detection import ColorFinder

@dataclass
class Clothes:
    clothes_type: str
    clothes_type_id: int
    clothes_type_top_bottom: str
    confidence: float
    color_id: int
    x1: float
    x2: float
    y1: float
    y2: float
    image: cv2.Mat


class ClothesFinder:
    def __init__(self):
        # AWS 서버에 올릴 예정이므로 GPU 사용하지 않습니다.
        print("CUDA available:", cv2.cuda.getCudaEnabledDeviceCount() > 0)
        self.yolo_pt_path = "./pt/deepfashion2_yolov8s-seg.pt"
        self.model = YOLO(self.yolo_pt_path)
        self.s3 = S3()
        self.colorFinder = ColorFinder()
        self.bottom = (6, 7, 8, 9, 10)
        self.top = (0,1,2,3,4)
        self.clothes_type_name_dic = {
            0: "반팔옷",
            1: "긴팔옷",
            2: "반팔옷",
            3: "긴팔옷",
            4: "조끼",
            6: "반바지",
            7: "긴바지",
            8: "반바지",
            9: "반바지",
            10: "긴바지"
        }

    # 옷 찾아내기
    def predict(self, img):
        output = self.model(img)
        # 결과
        # return output[0].plot()
        return output

    # 배경을 제거한 이미지와 해당 옷의 종류 반환
    def run(self, url, type):
        httpIdx = url.find("http")

        original = self.s3.get(url) if httpIdx != -1 else cv2.imread(url)

        # 최대 크기 설정
        max_width = 760
        max_height = 1200

        # 크기 조정
        original = self.resize_by_step(original, max_width, max_height)

        pred = self.predict(original)

        idx = 0
        data = json.loads(pred[0].tojson())
        for p in data :
            if type == 1 and p["class"] in self.bottom:
                break
            elif type == 0 and p["class"] in self.top:
                break
            idx += 1

        if type == 2:
            idx = 0

        if idx >= len(data) :
            print("ERROR : IDX OUT OF ARRAY")
            return 0


        clothes_type = data[idx]["name"]
        clothes_type_id = data[idx]["class"]
        confidence = data[idx]["confidence"]
        clothes_type_bottom_top = "bottom" if clothes_type_id in self.bottom else "top"
        # print(data)
        clothes_type = self.clothes_type_name_dic[clothes_type_id]

        points = np.array([[[int(x), int(y)] for x, y in zip(data[idx]["segments"]["x"], data[idx]["segments"]["y"])]],
                          dtype=np.int32)
        mask = np.zeros(pred[0].plot().shape[:2], dtype=np.uint8)
        cv2.fillPoly(mask, points, 255)

        tmp = cv2.cvtColor(np.array(original), cv2.COLOR_RGB2BGRA)


        color = self.colorFinder.getAvgColor(original, mask)
        # color = self.colorFinder.getAvgColorHSV(original, mask)
        # print(color)
        color_id = self.colorFinder.find_closest_color_LAB(tuple(color)) + 1
        # color_com = self.colorFinder.getColor(color_id)


        # color = self.colorFinder.colorFromList(color)
        # color = self.colorFinder.colorFromListHSL(color) HSL이 그나마 가장 좋은듯?
        # color_id = self.colorFinder.colorFromListWeight(color)
        # co, color_id = self.colorFinder.find_closest_color(color)
        # print(color_id)
        # print(co)
        # print(self.colorFinder.closest(color))
        # print("------------------------")
        # 검정 배경
        masked_image = cv2.bitwise_and(tmp, tmp, mask=mask)
        masked_image[mask == 0] = [255, 255, 255, 255]
        # 투명 배경으로 바꾸기
        # tmp[:, :, 3] = mask

        # height, width = masked_image.shape[:2]

        # 가로가 더 길다면 90도 시계 방향으로 회전
        # if width > height:
        #     image = cv2.rotate(masked_image, cv2.ROTATE_90_CLOCKWISE)

        # bgr_com = (color_com[2], color_com[1], color_com[0])
        # bgr = (color[2], color[1], color[0])

        # 100x100 픽셀 크기의 색상 이미지를 생성
        # color_image = np.zeros((300, 300, 3), dtype=np.uint8)
        # color_image_com = np.zeros((300,300,3), dtype=np.uint8)
        # color_image[:] = bgr
        # color_image_com[:] = bgr_com

        # OpenCV 창에 표시
        # cv2.imshow('Color', color_image)
        # cv2.imshow('Color_com', color_image_com)
        # cv2.imshow("original", cv2.resize(tmp, (640, 640)))
        # cv2.waitKey(0)
        # cv2.destroyAllWindows()

        # cv2.imshow("1", masked_image)
        # self.show(pred)

        return Clothes(clothes_type=clothes_type,
                       clothes_type_id=clothes_type_id,
                       clothes_type_top_bottom=clothes_type_bottom_top,
                       confidence=confidence,
                       image=masked_image,
                       color_id=color_id,
                       x1=data[idx]["box"]["x1"],
                       x2=data[idx]["box"]["x2"],
                       y1=data[idx]["box"]["y1"],
                       y2=data[idx]["box"]["y2"]
                       )


    def cvt2PngBytes(self, image):
        flag, data = cv2.imencode('.png', image)
        return data.tobytes()

    # 이미지 보여주기
    def show(self, pred):
        pred = cv2.cvtColor(pred[0].plot(), cv2.COLOR_BGR2RGB)

        open_cv_image = np.array(pred)
        open_cv_image = open_cv_image[:, :, ::-1]  # Convert BGR to RGB
        open_cv_image = cv2.resize(open_cv_image, (600, 720))
        cv2.imshow("Output", open_cv_image)

        # Wait until a key is pressed and then close the image window
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    def resize_by_step(self, image, max_width, max_height, scale_factor=0.8):
        """
        PIL 이미지를 주어진 크기 이하로 축소합니다.
        scale_factor를 적용하여 이미지를 줄입니다. 이미지 크기가 max_width, max_height 이하가 될 때까지 반복합니다.
        """
        if isinstance(image, Image.Image):  # PIL 이미지인지 확인
            # 이미지 크기가 max_width, max_height보다 클 때마다 scale_factor만큼 줄임
            while image.width > max_width or image.height > max_height:
                new_width = int(image.width * scale_factor)
                new_height = int(image.height * scale_factor)
                image = image.resize((new_width, new_height), Image.Resampling.LANCZOS)
        else:
            raise ValueError("이미지가 PIL 형식이어야 합니다.")

        return image