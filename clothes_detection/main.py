from ultralytics import YOLO
import cv2
import numpy as np
from PIL import Image
import cloth_detection
from cloth_detection import ClothesFinder

img = "./images/test.jpg"

cf = ClothesFinder()
pred = cf.predict(img)
cf.show(pred)





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