import cv2
import colorsys
import numpy as np
from skimage.color import rgb2lab, deltaE_ciede2000
from PIL import Image

class ColorFinder:
    def __init__(self):
        self.color_list = [
            (0,0,0),            # 검정
            # (128, 128, 128),    # 그레이
            (139, 69, 19),      # 새들브라운
            (255, 165, 0),      # 오렌지
            (255,255,0),        # 옐로우
            (0,128,0),          # 그린
            (0,0,255),          # 블루
            # (128,0,128),        # 퍼플
            (255,192,203),      # 핑크
            (255,0,0),          # 레드
            (255,255,255),      # 화이트
            (72, 209, 204),     # 미디엄쿼터즈
            (50, 205, 50),      # 라임그린
            (240, 230, 140),    # 카키
            (192, 192, 192),    # 실버
            (256, 99, 71)       # 토마토
        ]
        self.K = 1
        self.hsv_color_list = [self.rgb_to_hsv(*color) for color in self.color_list]
        self.lab_color_list = [self.rgb_to_lab(*color) for color in self.color_list]
        print(self.lab_color_list)
        self.lab_color_list = rgb2lab([[c / 255 for c in color] for color in self.color_list])
        print(self.lab_color_list)

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
    # def getAvgColor(self, original, mask):
    #     original_np = np.array(original)
    #     cv2.imshow("Original for Color Detection", original_np)  # 디버깅용
    #     cv2.imshow("Mask for Color Detection", mask)  # 디버깅용
    #
    #     clothes_region = cv2.bitwise_and(original_np, original_np, mask=mask)
    #     cv2.imshow("Clothes Region", clothes_region)  # 디버깅용
    #
    #     non_zero_mask = mask > 0
    #     average_color = np.zeros(3, dtype=np.float64)
    #     for i in range(3):  # RGB 각 채널에 대해 반복
    #         channel_sum = np.sum(clothes_region[:, :, i][non_zero_mask])
    #         pixel_count = np.sum(non_zero_mask)
    #         average_color[i] = channel_sum / pixel_count if pixel_count > 0 else 0
    #
    #     average_color = np.round(average_color).astype(int)
    #
    #     print(f"Calculated Average Color: {average_color}")  # 디버깅용
    #     return average_color

    def getAvgColorHSV(self, original, mask):
        original = np.array(original)
        hsv_image = cv2.cvtColor(original, cv2.COLOR_RGB2HSV)
        hsv_region = cv2.bitwise_and(hsv_image, hsv_image, mask=mask)
        non_zero_mask = mask > 0
        average_hsv = np.zeros(3, dtype=np.float64)

        for i in range(3):  # H, S, V 각 채널에 대해
            channel_values = hsv_region[:, :, i][non_zero_mask]
            if len(channel_values) > 0:
                average_hsv[i] = np.mean(channel_values)
            else:
                average_hsv[i] = 0  # 마스크된 영역이 없으면 0
        average_hsv = np.round(average_hsv).astype(int)
        return average_hsv

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

    def closest(self, color):
        colors = np.array(self.color_list)
        color = np.array(color)
        distances = np.sqrt(np.sum((colors - color) ** 2, axis=1))
        index_of_smallest = np.where(distances == np.amin(distances))
        smallest_distance = colors[index_of_smallest]
        return smallest_distance

    ######HSV
    def rgb_to_hsv(self, r, g, b):
        """RGB를 HSV로 변환"""
        # OpenCV는 0-255 범위, colorsys는 0-1 범위를 사용
        r, g, b = r / 255.0, g / 255.0, b / 255.0
        h, s, v = colorsys.rgb_to_hsv(r, g, b)
        return h * 360, s * 100, v * 100  # OpenCV처럼 h는 0-360, s/v는 0-100 스케일

    def find_closest_color(self, avg_hsv):
        """평균 RGB 값을 받아 HSV로 변환한 후 가장 가까운 색상을 찾음"""
        # avg_hsv = self.rgb_to_hsv(*avg_rgb)

        def hsv_distance(hsv1, hsv2):
            """HSV 거리 계산 (H는 주기적이므로 특별 처리)"""
            h1, s1, v1 = hsv1
            h2, s2, v2 = hsv2
            dh = min(abs(h1 - h2), 360 - abs(h1 - h2)) / 180.0  # 주기적 거리 계산
            ds = abs(s1 - s2) / 100.0
            dv = abs(v1 - v2) / 100.0
            return np.sqrt(dh ** 2 + ds ** 2 + dv ** 2)

        # HSV 거리 계산 후 최소값을 가지는 색상 반환
        distances = [hsv_distance(avg_hsv, hsv) for hsv in self.hsv_color_list]
        closest_index = np.argmin(distances)
        return self.color_list[closest_index], closest_index

    # LAB
    def find_closest_color_LAB(self, target_rgb):
        """
        주어진 LAB 값에 가장 가까운 색상을 찾는 함수
        :param target_lab: 비교할 CIE LAB 값 (tuple or list, ex: [L, a, b])
        :return: 가장 가까운 색상 (RGB, LAB, 색상명)
        """
        target_lab = rgb2lab([c / 255 for c in target_rgb])
        min_distance = float('inf')
        closest_index = -1

        print(target_lab)

        for i, lab in enumerate(self.lab_color_list):
            distance = deltaE_ciede2000(target_lab, lab)
            if distance < min_distance:
                min_distance = distance
                closest_index = i

        return closest_index

    def getColor(self, idx):
        return self.color_list[idx]