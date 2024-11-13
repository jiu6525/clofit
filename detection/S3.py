from PIL import Image
import requests
from io import BytesIO

# 이미지 경로를 주어주면 s3로 부터 이미지 다운로드
class S3 :
    def get(self, input):
        response = requests.get(input)
        if response.status_code == 200:
            # BytesIO 객체로 변환하여 PIL 이미지로 읽기
            return Image.open(BytesIO(response.content))
        else:
            raise Exception(f"Failed to fetch image. Status code: {response.status_code}")
