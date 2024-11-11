
from ultralytics import YOLO
import cv2
import numpy as np
from PIL import Image
from S3 import S3
import json
from dataclasses import dataclass

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

    # 옷 찾아내기
    def predict(self, img):
        output = self.model(img)
        # 결과
        # return output[0].plot()
        return output

    # 배경을 제거한 이미지와 해당 옷의 종류 반환
    def run(self, url):
        original = self.s3.get(url)

        pred = self.predict(original)

        data = json.loads(pred[0].tojson())
        clothes_type = data[0]["name"]
        clothes_type_id = data[0]["class"]
        confidence = data[0]["confidence"]
        # print(data)

        points = np.array([[[int(x), int(y)] for x, y in zip(data[0]["segments"]["x"], data[0]["segments"]["y"])]],
                          dtype=np.int32)
        mask = np.zeros(pred[0].plot().shape[:2], dtype=np.uint8)
        cv2.fillPoly(mask, points, 255)

        tmp = cv2.cvtColor(np.array(original), cv2.COLOR_RGB2BGRA)

        # 검정 배경
        # masked_image = cv2.bitwise_and(tmp, tmp, mask=mask)
        # 투명 배경으로 바꾸기
        tmp[:, :, 3] = mask

        self.show(pred)

        return Clothes(clothes_type=clothes_type,
                       clothes_type_id=clothes_type_id,
                       confidence=confidence,
                       image=tmp,
                       color_id=1,
                       x1=data[0]["box"]["x1"],
                       x2=data[0]["box"]["x2"],
                       y1=data[0]["box"]["y1"],
                       y2=data[0]["box"]["y2"]
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