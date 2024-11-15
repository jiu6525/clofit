from ultralytics import YOLO
import os
import cv2
import numpy as np
from PIL import Image
import cloth_detection
from cloth_detection import *
from human_detection import HumanFinder
from S3 import S3
import json
from color_detection import *
import csv

f = open("color_null.csv", "r")
reader = csv.reader(f)
lines = []
ff = open("test.csv", 'a', newline='')
wr = csv.writer(ff)
# wr.writerows(lines)
# img = "./images/test.jpg"
#
# cf = ClothesFinder()
# pred = cf.predict(img)
# cf.show(pred)

# url = "https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/fitting/3/1.jpg"
# url = "https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/cloth/bottom/26.png"
url_ = "https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/cloth/top/"
# url = "./images/test1.png"
cf = ClothesFinder()

flag = False
for line in reader:
    # if line[0] == "clothes_id" or int(line[0]) < 948:
    #     continue
    # ignore first line
    if flag :
        line.append("masked_url")
        # lines.append(line)
        wr.writerow(line)
        flag = False
        continue

    url = line[3]
    type_id = url.find("bottom")
    if type_id == -1:
        type_id = 0
    else:
        type_id = 1

    res = cf.run(url, type_id)
    line[6] = res.color_id
    file_path = "./mask/" + (("bottom/" + str(int(line[0]) - 500)) if type_id == 1 else "top/" + line[0]) + "_masked.png"
    if not os.path.exists(file_path):
        cv2.imwrite(file_path, res.image)

    line.append(url.rstrip(".png") + "_masked.png")
    # lines.append(line)
    wr.writerow(line)


# for line in lines:
#     wr.wr

# idx = url_.find("bottom")
#
# if idx == -1:
#     idx = 0
# else:
#     idx = 1

# idx = 0
# for i, line in range(1, 501), reader:
#     i_str = str(i)
#     url = url_ + i_str + ".png"
#     # print("# " + i_str + " ---- " + url)
#     res = cf.run(url, idx)
#     line[6] = res.color_id
#     lines.append(line)
#
# url_ = "https://clofit-s3-bucket.s3.ap-southeast-2.amazonaws.com/cloth/bottom/"
# idx = 1
# for i, line in range(1, 501), reader:
#     i_str = str(i)
#     url = url_ + i_str + ".png"
#     # print("# " + i_str + " ---- " + url)
#     res = cf.run(url, idx)
#     line[6] = res.color_id
#     lines.append(line)

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