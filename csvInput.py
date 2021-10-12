import csv

file = open('sensor1.csv')

csvreader = csv.reader(file)

header = next(csvreader)

rows = []

for row in csvreader:
    rows.append(row)

file.close()

for i in range(1, len(rows)):
    value = int(rows[i][1])
    if value < 100:
        rows[i].append('too low')
    elif 100 < value < 200:
        rows[i].append('yellow')
    elif 200 < value < 400:
        rows[i].append('orange')
    elif 400 < value < 600:
        rows[i].append('red')
    else:
        rows[i].append('too high')

print(rows)