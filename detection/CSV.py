import os
import csv
from cloth_detection import ClothesFinder

cf = ClothesFinder()
f = open("test2.csv", "r")
reader = csv.reader(f)
lines = []
ff = open("test3.csv", 'w', newline='')
wr = csv.writer(ff)

flag = True

for line in reader:
    if flag:
        lines.append(line)
        flag = False
        continue

    url = line[3]
    type_id = url.find("bottom")
    if type_id == -1:
        type_id = 0
    else:
        type_id = 1

    res = cf.run(url, type_id)
    line[6] = res.color_id + 1
    # line[6] = str(int(line[6]) + 1)

    lines.append(line)

wr.writerows(lines)