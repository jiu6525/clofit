from ultralytics import YOLO
import cv2
import numpy as np
from PIL import Image

class ClothesFinder:
    def __init__(self):
        # AWS 서버에 올릴 예정이므로 GPU 사용하지 않습니다.
        print("CUDA available:", cv2.cuda.getCudaEnabledDeviceCount() > 0)
        self.yolo_pt_path = "./pt/deepfashion2_yolov8s-seg.pt"
        self.model = YOLO(self.yolo_pt_path)

    def predict(self, img):
        output = self.model(img)
        # 결과
        return output[0].plot()

    def show(self, pred):
        pred = cv2.cvtColor(pred, cv2.COLOR_BGR2RGB)

        open_cv_image = np.array(pred)
        open_cv_image = open_cv_image[:, :, ::-1]  # Convert BGR to RGB
        open_cv_image = cv2.resize(open_cv_image, (600, 720))
        cv2.imshow("Output", open_cv_image)

        # Wait until a key is pressed and then close the image window
        cv2.waitKey(0)
        cv2.destroyAllWindows()