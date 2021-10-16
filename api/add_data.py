import requests
import csv
import json
import random

filenames = ["SensorTest-sensor1.csv", "SensorTest-sensor2.csv",
             "SensorTest-sensor3.csv", "SensorTest-sensor4.csv"]


def send_api_data_entry(new_session_id, counter, date_time, left_hamstring, right_hamstring, left_quad, right_quad):
    response = requests.post(
        "http://localhost:5000/exercise_data/add_data",
        json={
            "session_id": new_session_id,
            "order_in_session": counter,
            "date_time": date_time,
            "muscles":
            {
                "left_hamstring": left_hamstring,
                "right_hamstring": right_hamstring,
                "left_quad": left_quad,
                "right_quad": right_quad
            }
        })
    print(response.json())


def create_session():
    # create the session to add the data to
    response = requests.post("http://localhost:5000/sessions/add_session",
                             json={"athlete_id": 23, "start_date": "2021-09-30"})
    # now we get the id of the session that has just been created
    new_session_id = json.loads(str(response.json()).replace("'", '"'))
    return new_session_id['session_id']


new_session_id = create_session()
# we open all the files
file1 = open('api/data/'+filenames[0], newline='')
file2 = open('api/data/'+filenames[1], newline='')
file3 = open('api/data/'+filenames[2], newline='')
file4 = open('api/data/'+filenames[3], newline='')
reader1 = list(csv.reader(file1, delimiter=' ', quotechar='|'))
reader2 = list(csv.reader(file2, delimiter=' ', quotechar='|'))
reader3 = list(csv.reader(file3, delimiter=' ', quotechar='|'))
reader4 = list(csv.reader(file4, delimiter=' ', quotechar='|'))
# now we send the data to the api
counter = 1

while counter < random.randint(2, 30):
    try:
        entries1 = str(reader1[counter][0]).split('T')
        entries2 = str(reader2[counter][0]).split('T')
        entries3 = str(reader3[counter][0]).split('T')
        entries4 = str(reader4[counter][0]).split('T')

        date = "2021-10-13"
        time = entries1[1].split('Z')[0]
        # get the data from the entries
        data1 = str(entries1[1]).split(',')[1]
        data2 = str(entries2[1]).split(',')[1]
        data3 = str(entries3[1]).split(',')[1]
        data4 = str(entries4[1]).split(',')[1]
    except IndexError:
        print('eof reached')
        continue

    send_api_data_entry(new_session_id, counter, date +
                        " " + time, data1, data2, data3, data4)
    counter += 1
# for row in reader:
#     send_api_data_entry(new_session_id, row, counter)
#     counter += 1
