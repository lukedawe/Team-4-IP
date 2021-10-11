# to run this API, use the line "flask run"

from flask import Flask, json, request, jsonify
from flask_cors import CORS
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
CORS(app)


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
def add_athlete():
    if request.is_json:
        user_details = request.get_json()

        try:
            query = "EXEC addAthlete @name = '"+user_details['name']+"', @email = '"+user_details['email'] + \
                    "', @password = '"+user_details['password']+"'"
            # if the query has the pt id present, add that param to the query
            if 'pt_id' in user_details:
                query += "', @pt_id = "+str(user_details['pt_id'])
            # end the query
            query += ";"

        except KeyError:
            print('Missing key in request')
            return {"error": "Request must contain required keys"}, 415

        # execute and commit the query
        cursor.execute(str(query))
        cnxn.commit()
        return 'OK'
    else:
        return {"error": "Request must be JSON"}, 415


# this is to create a new personal trainer account
@app.post("/users/add_pt")
def add_pt():
    if request.is_json:
        user_details = request.get_json()

        try:
            query = "EXEC addPt @name = '"+user_details['name'] +\
                "', @email = '"+user_details['email'] + \
                "', @password = '"+user_details['password']+"';"
        except KeyError:
            print('Missing key in request')
            return {"error": "Request must contain required keys"}, 415
        # execute and commit the query
        cursor.execute(str(query))
        cnxn.commit()
        return 'OK'
    else:
        return {"error": "Request must be JSON"}, 415

# this is to create a new personal trainer account
@app.post("/users/add_user")
def add_user():
    if request.is_json:
        user_details = request.get_json()

        try:
            query = "EXEC addUser @user_type = '"+user_details['user_type'] + \
                "', @name = '"+user_details['name'] +\
                "', @email = '"+user_details['email'] + \
                "', @password = '"+user_details['password']+"'"

            # if the query has the pt id present, add that param to the query
            if 'pt_id' in user_details and user_details['user_type'] == "personal trainer":
                query += ", @pt_id = "+str(user_details['pt_id'])
            # end the query
            query += ";"
        except KeyError:
            print('Missing key in request')
            return {"error": "Request must contain required keys"}, 415
        # execute and commit the query
        cursor.execute(str(query))
        cnxn.commit()
        return 'OK'
    else:
        return {"error": "Request must be JSON"}, 415

# this is to add a data point to an already existing session


@app.post("/exercise_data/add_data")
def add_data():
    if request.is_json:
        exercise_data = request.get_json()

        try:
            query = "EXEC addDataEntry @session_id = "+str(exercise_data['session_id']) +\
                ", @order_in_session = " + str(exercise_data['order_in_session']) + \
                ", @date_time = '" + str(exercise_data['date_time']) + \
                "', @left_hamstring = " + str(exercise_data['muscles']['left_hamstring']) +\
                ", @right_hamstring = " + str(exercise_data['muscles']['right_hamstring']) +\
                ", @left_quad = " + str(exercise_data['muscles']['left_quad']) +\
                ", @right_quad = " + \
                    str(exercise_data['muscles']['right_quad'])+";"
            print(query)
            # execute and commit the query
            cursor.execute(str(query))
            cnxn.commit()
            return 'OK'
        except KeyError:
            print('JSON did not hold reqired data')
            return {"error": "Request must contain required keys"}, 415
    else:
        return {"error": "Request must be a JSON"}, 415


# query to add a session to the database, returns the ID of the session
@app.post("/sessions/add_session")
def add_session():
    if request.is_json:
        session_data = request.get_json()
        try:
            query = "EXEC addSession @athlete_id = " + str(session_data['athlete_id']) +\
                    ", @start_date = '" + str(session_data['start_date']) + "'"
            # if the query holds a comment, add the comment to the query
            if 'comment' in session_data:
                query += ", @comment = '" + str(session_data['comment'])+"'"
            # end the query
            query += ";"
            print(query)
            # execute and commit the query
            cursor.execute(str(query))
            id = cursor.fetchone()
            # return the ID of the session that was just created
            return str(id[0])
        except KeyError:
            print('JSON did not hold reqired data')
            return {"error": "Request must contain required keys"}, 415
    else:
        return {"error": "Request must be a JSON"}, 415



# for this you'll need the session id that the data belongs to along with it's number within the session
@app.post("/exercise_data/get_data")
def get_data():
    if request.is_json:
        search_criteria = request.get_json()

        try:
            query = "EXEC getDataEntry @session_id = " + str(search_criteria['session_id']) + \
                ", @order_in_session = " + \
                    str(search_criteria['order_in_session']) + ";"
            print(query)
            # execute and commit the query
            cursor.execute(str(query))
            # there should only be one row returned
            row = cursor.fetchone()
            return_data = {'id': row[0], 'date': str(row[3].day) + ', ' + str(row[3].month) + ', ' + str(row[3].year),
                           'time': str(row[3].hour) + ':' + str(row[3].minute) + ':' + str(row[3].second) + '.' + str(row[3].microsecond),
                           'muscles': {'left hamstring': row[4], 'right hamstring': row[5], 'left quad': row[6], 'right quad': row[7]}}
            return json.dumps(return_data)

        except KeyError:
            print('JSON did not hold reqired data')
            return {"error": "Request must contain required keys"}, 415
        except TypeError:
            print('Query returned no data')
            return {"error": "Request returned nothing"}, 415
    else:
        return {"error": "Request must be a JSON"}, 415


# query to get all the clients that one pt manages
# requires the email of the pt (I thought this was easier than the ID)


@app.post("/users/pt_get_clients")
def pt_get_clients():
    if request.is_json:
        request_data = request.get_json()
        try:
            query = "EXEC getPtClients @pt_email = '" + \
                str(request_data['pt_email']) + "';"
            print(query)
            cursor.execute(str(query))
            clients = cursor.fetchall()
        except KeyError:
            print('JSON did not hold reqired data')
            return {"error": "Request must contain required keys"}, 415
        except TypeError:
            print('Query returned no data')
            return {"error": "Request returned nothing"}, 415
    else:
        return {"error": "Request must be a JSON"}, 415
    # an array of dictionaries that store the client data
    client_array = []
    # go through each client and add their details to the array
    # rstrip() removes spaces at the end of lines https://docs.python.org/3/library/stdtypes.html#str.rstrip
    for client in clients:
        array_entry = {'id': str(client[0]).rstrip(), 'name': str(
            client[1]).rstrip(), 'email': str(client[2]).rstrip()}
        client_array.append(array_entry)
    # turn the array into a JSON to send
    return_json = {'clients': client_array}
    return json.dumps(return_json)


# get sessions associated with the user
@app.post("/sessions/get_user_sessions")
def get_user_sessions():
    if request.is_json:
        session_data = request.get_json()
        try:
            query = "EXEC getUserSessions @athlete_id = " + \
                str(session_data['athlete_id']) + ";"
            print(query)
            cursor.execute(str(query))
            sessions = cursor.fetchall()
        except KeyError:
            print('JSON did not hold reqired data')
            return {"error": "Request must contain required keys"}, 415
        except TypeError:
            print('Query returned no data')
            return {"error": "Request returned nothing"}, 415
    else:
        return {"error": "Request must be a JSON"}, 415
    # an array of dictionaries that store the client data
    session_array = []
    # go through each client and add their details to the array
    for session in sessions:
        array_entry = {'id': str(session[0]).rstrip(),
                       'date': str(session[1].day) + ', ' + str(session[1].month) + ', ' + str(session[1].year),
                       'comment': str(session[2]).rstrip()}
        session_array.append(array_entry)

    return_json = {'sessions': session_array}
    return json.dumps(return_json)


# effectively log the user in
# requires the user's username and password (works for both athletes and pt's)
@app.post("/users/get_user_id")
def get_user_id():
    if request.is_json:
        user_data = request.get_json()
        try:
            query = "EXEC getUserId @user_type = '" + user_data['user_type'] + \
                "', @email = '" + \
                    user_data['email'] + "', @password = '" + \
                user_data['password'] + "';"
            print(query)
            cursor.execute(str(query))
            user = cursor.fetchone()
            print(str(user[0]))
            # return the ID of the user
            return(str(user[0]))

        except KeyError:
            print('JSON did not hold reqired data')
            return {"error": "Request must contain required keys"}, 415
        except TypeError:
            print('Query returned no data')
            return {"error": "Request returned nothing"}, 415
    else:
        return {"error": "Request must be a JSON"}, 415


# def run_query(query: str):
#     cursor.execute(query)
#     row = cursor.fetchone()
#     while row:
#         print(row[0])
#         row = cursor.fetchone()
