import os
import csv

f = open("test.csv", "r")
reader = csv.reader(f)
lines = []
ff = open("test2.csv", 'w', newline='')
wr = csv.writer(ff)

flag = True

for line in reader:
    if flag:
        lines.append(line)
        flag = False
        continue

    line[6] = str(int(line[6]) + 1)
    lines.append(line)

wr.writerows(lines)