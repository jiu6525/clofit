from rembg import remove
from PIL import Image

# input="./images/human.png"
# output="./images/result.png"
# 
# img = Image.open(input)
# out = remove(img)
# 
# out.save(output)


# 이미지 경로를 주어주면 배경이 제거된 이미지 반환
class humanFinder :
    def find(self, input):
        return remove(Image.open(input))
