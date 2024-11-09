from rembg import remove
from PIL import Image
import requests
from io import BytesIO

# input="./images/human.png"
# output="./images/result.png"
# 
# img = Image.open(input)
# out = remove(img)
# 
# out.save(output)


# 이미지 경로를 주어주면 배경이 제거된 이미지 반환
class HumanFinder :
    def find(self, input):
        response = requests.get(input)
        if response.status_code == 200:
            # BytesIO 객체로 변환하여 PIL 이미지로 읽기
            img = Image.open(BytesIO(response.content))
            return img
        else:
            raise Exception(f"Failed to fetch image. Status code: {response.status_code}")
