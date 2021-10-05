# to run this API, use the line "flask run"

from flask import Flask, json, request, jsonify
from requests.sessions import merge_cookies
import pyodbc
import json

# open the files with connection details
with open("./connection_details.json") as database_details:
    database_details = json.loads(database_details.read())

# get the details from the files
server = str('tcp:' + database_details['server name'])
database = database_details['database name']
username = database_details['admin username']
password = database_details['admin password']

cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' +
                      server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD={' + password + '}')
cnxn.setdecoding(pyodbc.SQL_CHAR, encoding='latin1')
cnxn.setencoding('latin1')

cursor = cnxn.cursor()
app = Flask(__name__)


# gets all the athlete accounts in the database
@app.get("/users/get_all_athletes")
def get_athletes():
    cursor.execute("SELECT * FROM Athlete")
    row = cursor.fetchone()
    while row:
        print(str(row[0]) + " " + str(row[1]))
        row = cursor.fetchone()
    return 'OK'


# gets all the personal trainer accounts in the database
@app.get("/users/get_all_pts")
def get_pts():
    cursor.execute("SELECT * FROM Personal_Trainer")
    row = cursor.fetchone()
    while row:
        print(str(row[0]) + " " + str(row[1]))
        row = cursor.fetchone()
    return 'OK'


# this is to create a new athlete account
@app.post("/users/add_athlete")
def create_user():
    if request.is_json:
        user_details = request.get_json()

        try:
            if 'pt_id' in user_details:
                query = "EXEC addAthlete @name = '"+user_details['name']+"', @pt_id = "+str(user_details['pt_id']) + \
                    ", @email = '"+user_details['email'] + \
                    "', @password = '"+user_details['password']+"';"
            else:
                query = "EXEC addAthlete @name = '"+user_details['name']+"', @pt_id = '', @email = '"+user_details['email'] + \
                    "', @password = '"+user_details['password']+"';"
        except KeyError:
            print('Missing key in request')
            return {"error": "Request must contain required keys"}, 415

        cursor.execute(str(query))
        return 'OK'
    else:
        return {"error": "Request must be JSON"}, 415


# this is to create a new personal trainer account
@app.post("/users/add_pt")
def create_pt():
    if request.is_json:
        user_details = request.get_json()

        try:
            query = "EXEC addPt @name = '"+user_details['name'] +\
                "', @email = '"+user_details['email'] + \
                "', @password = '"+user_details['password']+"';"
        except KeyError:
            print('Missing key in request')
            return {"error": "Request must contain required keys"}, 415

        cursor.execute(str(query))
        return 'OK'
    else:
        return {"error": "Request must be JSON"}, 415


# this is to add a data point to an already existing session
@app.post("/exercise_data/add_data")
def add_data():
    if request.is_json:
        exercise_data = request.get_json()

        try:
            query = "EXEC " # someone needs to make a procedure for adding data
        except KeyError:
            print('JSON did not hold reqired data')
    else:
        return {"error": "Request must be a JSON"}, 415

# def run_query(query: str):
#     cursor.execute(query)
#     row = cursor.fetchone()
#     while row:
#         print(row[0])
#         row = cursor.fetchone()
