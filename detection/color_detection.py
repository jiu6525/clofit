import cv2
import numpy as np
from sklearn.cluster import KMeans
from PIL import Image

class ColorFinder:
    def __init__(self):
        self.color_list = [
            (0,0,0),            # 검정
            (128, 128, 128),    # 그레이
            (139, 69, 19),      # 새들브라운
            (256, 165, 0),      # 오렌지
            (256,256,0),        # 옐로우
            (0,128,0),          # 그린
            (0,0,256),          # 블루
            (128,0,128),        # 퍼플
            (256,192,203),      # 핑크
            (256,0,0),          # 레드
            (256,256,256)       # 화이트
        ]
        self.K = 1

    def getColor(self, image, x1, x2, y1, y2):
        x1, y1, x2, y2 = map(int, [x1, y1, x2, y2])
        box = image[y1:y2, x1:x2]
        pixels = box.reshape((-1,3))

        # K-Means 클러스터링 수행
        kmeans = KMeans(n_clusters=self.K, random_state=42)
        kmeans.fit(pixels)

        # 클러스터의 중심(대표 색상)
        colors = kmeans.cluster_centers_.astype(int)

        print(colors)