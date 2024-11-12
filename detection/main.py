from ultralytics import YOLO
import cv2
import numpy as np
from PIL import Image
import cloth_detection
from cloth_detection import *
from human_detection import HumanFinder
from S3 import S3
import json
from color_detection import *

# img = "./images/test.jpg"
#
# cf = ClothesFinder()
# pred = cf.predict(img)
# cf.show(pred)

url = "https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/fitting/3/1.jpg"
cf = ClothesFinder()

res = cf.run(url)

# colorFinder = ColorFinder()
# colorFinder.getColor(cv2.cvtColor(res.image, cv2.COLOR_RGBA2RGB), res.x1, res.y1, res.x2, res.y2)
# colorFinder.getColor(res.image)
#######clothes
# s3 = S3()
# cf = ClothesFinder()
# original = s3.get(url)
# pred = cf.predict(original)
#
# print(pred[0].tojson())
#
# json = json.loads(pred[0].tojson())
#
# print(json[0]["name"])
#
# cf.show(pred)
#
# points = np.array([[[int(x), int(y)] for x, y in zip(json[0]["segments"]["x"], json[0]["segments"]["y"])]], dtype=np.int32)
#
# mask = np.zeros(pred[0].plot().shape[:2], dtype=np.uint8)
#
# cv2.fillPoly(mask, points, 255)
#
# tmp = cv2.cvtColor(np.array(original), cv2.COLOR_RGB2BGRA)
#
# # masked_image = cv2.bitwise_and(tmp, tmp, mask=mask)
# tmp[:,:,3] = mask
#
# cv2.imshow("test", tmp)
#
# cv2.waitKey(0)
# cv2.destroyAllWindows()
#
# cv2.imwrite("./test.png", tmp)

#### human detect
# hf = HumanFinder()
# img = hf.find("https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/fitting/3/10.jpg")
# img.show()




# path = "./pt/deepfashion2_yolov8s-seg.pt"
#
# model = YOLO(path)
#
# img = "./images/test.jpg"
# output = model(img)
# # Get the predictions
# pred = output[0].plot()
#
# # Convert the prediction to RGB format and to PIL Image
# pred = cv2.cvtColor(pred, cv2.COLOR_BGR2RGB)
# pred_image = Image.fromarray(pred)
#
# # Convert the prediction to OpenCV format for display
# open_cv_image = np.array(pred)
# open_cv_image = open_cv_image[:, :, ::-1]  # Convert BGR to RGB
# open_cv_image = cv2.resize(open_cv_image, (600, 720))
# # Display the image
# cv2.imshow("YOLO Segmentation Output", open_cv_image)
#
# # Wait until a key is pressed and then close the image window
# cv2.waitKey(0)
# cv2.destroyAllWindows()