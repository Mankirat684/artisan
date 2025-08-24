import sys
from PIL import Image, ImageEnhance
import os

imagePath =  sys.argv[1]
image = Image.open(imagePath)

brightnessEnhancer = ImageEnhance.Brightness(image)
img = brightnessEnhancer.enhance(1.5)
sharpnessEnhancer = ImageEnhance.Sharpness(img)
img = sharpnessEnhancer.enhance(1.5)

filename = os.path.basename(imagePath)
output_path = os.path.join("public", "modified_" + filename)
img.save(output_path)

print(output_path)
