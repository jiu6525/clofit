import cv2
import colorsys
import numpy as np
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

    # rgb 값의 평균을 구한다.
    def getAvgColor(self, original, mask):
        original_np = np.array(original)
        clothes_region = cv2.bitwise_and(original_np, original_np, mask=mask)
        non_zero_mask = mask > 0
        average_color = np.zeros(3, dtype=np.float64)
        for i in range(3):  # RGB 각 채널에 대해 반복
            channel_sum = np.sum(clothes_region[:, :, i][non_zero_mask])
            pixel_count = np.sum(non_zero_mask)
            average_color[i] = channel_sum / pixel_count if pixel_count > 0 else 0

        average_color = np.round(average_color).astype(int)  #

        return average_color

    # 색상 리스트에서 가장 가까운 색을 찾아서 반환, 인간의 인식과 비슷하게 만들기 위해 CIE LAB 색상 공간으로 변경
    def colorFromList(self, color):
        lab_color = self.rgb_to_lab(*color)
        distances = []
        for c in self.color_list:
            lab_c = self.rgb_to_lab(*c)
            distance = np.sqrt(sum((a - b) ** 2 for a, b in zip(lab_color, lab_c)))
            distances.append(distance)

        closest_color_index = np.argmin(distances)
        return closest_color_index

    def rgb_to_lab(self, r, g, b):
        x, y, z = self.rgb_to_xyz(r, g, b)
        L, a, b = self.xyz_to_lab(x, y, z)
        return (L, a, b)

    def rgb_to_xyz(self, r, g, b):
        r = r / 255.0
        g = g / 255.0
        b = b / 255.0

        r = ((r + 0.055) / 1.055) ** 2.4 if r > 0.04045 else r / 12.92
        g = ((g + 0.055) / 1.055) ** 2.4 if g > 0.04045 else g / 12.92
        b = ((b + 0.055) / 1.055) ** 2.4 if b > 0.04045 else b / 12.92

        x = r * 0.4124 + g * 0.3576 + b * 0.1805
        y = r * 0.2126 + g * 0.7152 + b * 0.0722
        z = r * 0.0193 + g * 0.1192 + b * 0.9505

        return (x, y, z)

    def xyz_to_lab(self, x, y, z):
        x = x / 0.95047
        y = y / 1.00000
        z = z / 1.08883

        x = x ** (1 / 3) if x > 0.008856 else (7.787 * x) + (16 / 116)
        y = y ** (1 / 3) if y > 0.008856 else (7.787 * y) + (16 / 116)
        z = z ** (1 / 3) if z > 0.008856 else (7.787 * z) + (16 / 116)

        L = (116 * y) - 16
        a = 500 * (x - y)
        b = 200 * (y - z)

        return (L, a, b)

    # HSL 버전
    def colorFromListHSL(self, color):
        distances = [self.color_distance_hsl(color, c) for c in self.color_list]
        return np.argmin(distances)

    # def color_distance_hsl(self, color1, color2):
    #     h1, s1, l1 = self.rgb_to_hsl(*color1)
    #     h2, s2, l2 = self.rgb_to_hsl(*color2)
    #
    #     dh = min(abs(h1 - h2), 360 - abs(h1 - h2)) / 180.0
    #     ds = abs(s1 - s2) / 100.0
    #     dl = abs(l1 - l2) / 100.0
    #
    #     return (dh ** 2 + ds ** 2 + dl ** 2) ** 0.5
    def color_distance_hsl(self, color1, color2):
        h1, s1, l1 = self.rgb_to_hsl(*color1)
        h2, s2, l2 = self.rgb_to_hsl(*color2)

        # Hue 차이는 360도를 기준으로 순환하므로, 더 나은 차이 계산을 위해
        dh = min(abs(h1 - h2), 360 - abs(h1 - h2)) / 180.0
        ds = abs(s1 - s2) / 100.0
        dl = abs(l1 - l2) / 100.0

        # 가중치 조정: 채도와 명도의 차이가 더 중요할 수 있도록 가중치를 적용
        return (dh ** 2 + 2 * ds ** 2 + 2 * dl ** 2) ** 0.5

    def rgb_to_hsl(self, r, g, b):
        r, g, b = r / 255.0, g / 255.0, b / 255.0
        h, l, s = colorsys.rgb_to_hls(r, g, b)
        return (h * 360, s * 100, l * 100)
    ###### HSL end

    # RGB Weight Version
    def weighted_distance(self, color1, color2):
        r1, g1, b1 = color1
        r2, g2, b2 = color2
        return ((0.3 * (r1 - r2)) ** 2 + (0.59 * (g1 - g2)) ** 2 + (0.11 * (b1 - b2)) ** 2) ** 0.5

    def colorFromListWeight(self, color):
        distances = [self.weighted_distance(color, c) for c in self.color_list]
        return np.argmin(distances)
    ###### RGB Weight end