
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
        self.bottom = (6, 7)
        self.top = (0,1,2,3,4)

    # 옷 찾아내기
    def predict(self, img):
        output = self.model(img)
        # 결과
        # return output[0].plot()
        return output

    # 배경을 제거한 이미지와 해당 옷의 종류 반환
    def run(self, url, type):
        original = self.s3.get(url)

        pred = self.predict(original)

        idx = 0
        data = json.loads(pred[0].tojson())
        for p in data :
            if type == 1 and p["class"] in self.bottom:
                break
            elif type == 0 and p["class"] in self.top:
                break
            idx += 1

        if idx >= len(data) :
            print("ERROR : IDX OUT OF ARRAY")
            return 0


        clothes_type = data[idx]["name"]
        clothes_type_id = data[idx]["class"]
        confidence = data[idx]["confidence"]
        # print(data)

        points = np.array([[[int(x), int(y)] for x, y in zip(data[idx]["segments"]["x"], data[idx]["segments"]["y"])]],
                          dtype=np.int32)
        mask = np.zeros(pred[idx].plot().shape[:2], dtype=np.uint8)
        cv2.fillPoly(mask, points, 255)

        tmp = cv2.cvtColor(np.array(original), cv2.COLOR_RGB2BGRA)


        color = self.colorFinder.getAvgColor(original, mask)
        print(color)
        # color = self.colorFinder.colorFromList(color)
        # color = self.colorFinder.colorFromListHSL(color) HSL이 그나마 가장 좋은듯?
        color_id = self.colorFinder.colorFromListWeight(color)
        print(color_id)
        print("THIS IS " + clothes_type)

        # 검정 배경
        masked_image = cv2.bitwise_and(tmp, tmp, mask=mask)
        masked_image[mask == 0] = [255, 255, 255, 255]
        # 투명 배경으로 바꾸기
        # tmp[:, :, 3] = mask

        bgr = (color[2], color[1], color[0])

        # 100x100 픽셀 크기의 색상 이미지를 생성
        color_image = np.zeros((100, 100, 3), dtype=np.uint8)
        color_image[:] = bgr

        # OpenCV 창에 표시
        cv2.imshow('Color', color_image)
        cv2.imshow("1", masked_image)
        self.show(pred)

        return Clothes(clothes_type=clothes_type,
                       clothes_type_id=clothes_type_id,
                       confidence=confidence,
                       image=tmp,
                       color_id=color_id,
                       x1=data[idx]["box"]["x1"],
                       x2=data[idx]["box"]["x2"],
                       y1=data[idx]["box"]["y1"],
                       y2=data[idx]["box"]["y2"]
                       )



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