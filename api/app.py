# to run this API, use the line "flask run"
from flask import Flask, json, request
from flask_cors import CORS
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

try:
    cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=' +
                          server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD={' + password + '}')
    cnxn.setdecoding(pyodbc.SQL_CHAR, encoding='latin1')
    cnxn.setencoding('latin1')

    cursor = cnxn.cursor()

except pyodbc.ProgrammingError as pe:
    print("Cannot connect to the database, the IP needs to be added to the Azure Management Portal error: \n\n", pe)

app = Flask(__name__)
CORS(app)

# all the different user types that are in the database,
# add to this list if the types of user expand
user_types = ['athlete', 'personal trainer']

# takes the id and gives the name and the user type


@app.post("/users/get_user_name")
def get_user_name():
    if request.is_json:
        user_data = request.get_json()

        try:
            query = "EXEC getUserName @id=" + \
                str(user_data['id']) + ", @user_type='" + \
                user_data['user_type']+"';"
            print(query)
            cursor.execute(str(query))
            user = cursor.fetchone()
            if user[0]:
                print(str(user[0]))
                # return the ID of the user
                return {"user_name": str(user[0]).rstrip()}, 200
            else:
                return {"message": "Request returned nothing"}, 200

        except KeyError:
            print('JSON did not hold reqired data')
            return {"error": "Request must contain required keys"}, 415
        except TypeError:
            print('Query returned no data')
            return {"message": "Request returned nothing"}, 200
    else:
        return {"error": "Request must be a JSON"}, 415


# gets all the athlete accounts in the database
@app.get("/users/get_all_athletes")
def get_athletes():
    cursor.execute("SELECT * FROM Athlete")
    row = cursor.fetchone()
    while row:
        print(str(row[0]) + " " + str(row[1]))
        row = cursor.fetchone()
    return {"message": "OK"}


# gets all the personal trainer accounts in the database
@app.get("/users/get_all_pts")
def get_pts():
    cursor.execute("SELECT * FROM Personal_Trainer")
    row = cursor.fetchone()
    while row:
        print(str(row[0]) + " " + str(row[1]))
        row = cursor.fetchone()
    return {"message": "OK"}


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
                query += ", @pt_id = "+str(user_details['pt_id'])
            # end the query
            query += ";"

        except KeyError:
            print('Missing key in request')
            return {"error": "Request must contain required keys"}, 415

        # execute and commit the query
        cursor.execute(str(query))
        cnxn.commit()
        return {"message": "OK"}
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
        return {"message": "OK"}
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
        return {"message": "OK"}
    else:
        return {"error": "Request must be JSON"}, 415

# this is to add a data point to an already existing session


@app.post("/exercise_data/add_data")
def add_data():
    if request.is_json:
        exercise_data = request.get_json()
        print(exercise_data)
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
            return {"message": "OK"}
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
            query = "EXEC addSession @athlete_id = " + str(int(session_data['athlete_id'])) +\
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
            new_id = str(id[0])
            cnxn.commit()
            # return the ID of the session that was just created
            return {"session_id": new_id}
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
                           'muscles': {'left_hamstring': row[4], 'right_hamstring': row[5], 'left_quad': row[6], 'right_quad': row[7]}}
            return json.dumps(return_data)

        except KeyError:
            print('JSON did not hold reqired data')
            return {"error": "Request must contain required keys"}, 415
        except TypeError:
            print('Query returned no data')
            return {"message": "Request returned nothing"}, 200
    else:
        return {"error": "Request must be a JSON"}, 415


# query to get all the clients that one pt manages
# requires the id of the pt


@app.post("/users/pt_get_clients")
def pt_get_clients():
    if request.is_json:
        request_data = request.get_json()
        try:
            query = "EXEC getPtClients @pt_id = " + \
                str(request_data['pt_id']) + ";"
            print(query)
            cursor.execute(str(query))
            clients = cursor.fetchall()
        except KeyError:
            print('JSON did not hold reqired data')
            return {"error": "Request must contain required keys"}, 415
        except TypeError:
            print('Query returned no data')
            return {"message": "Request returned nothing"}, 200
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
# TODO add optional perameter for the number of sessions that you want to be returned
@app.post("/sessions/get_user_sessions")
def get_user_sessions():
    if request.is_json:
        session_data = request.get_json()
        try:
            query = "EXEC getUserSessions @athlete_id = " + \
                str(session_data['athlete_id']) + ";"
            print(query)
            cursor.execute(str(query))
            # the no_of_sessions param allows you to specify the number
            # of sessions that you want to return, if not included, it will return all sessions
            if "no_of_sessions" not in session_data:
                sessions = cursor.fetchall()
            else:
                sessions = []
                row = cursor.fetchone()
                count = 0
                while row and count < session_data["no_of_sessions"]:
                    sessions.append(row)
                    row = cursor.fetchone()
                    count += 1
        except KeyError:
            print('JSON did not hold reqired data')
            return {"error": "Request must contain required keys"}, 415
        except TypeError:
            print('Query returned no data')
            return {"message": "Request returned nothing"}, 200
    else:
        return {"error": "Request must be a JSON"}, 415
    # an array of dictionaries that store the client data
    session_array = []
    # go through each client and add their details to the array
    for session in sessions:
        array_entry = {'id': str(session[0]).rstrip(),
                       'date': str(session[1].day) + '/' + str(session[1].month) + '/' + str(session[1].year),
                       'comment': str(session[2]).rstrip()}
        session_array.append(array_entry)

    return_json = {'sessions': session_array}
    return json.dumps(return_json), 200


# effectively log the user in
# requires the user's username and password (works for both athletes and pt's)
@app.post("/users/get_user_id")
def get_user_id():
    if request.is_json:
        user_data = request.get_json()

        for user_type in user_types:
            try:
                query = "EXEC getUserId @user_type = '" + user_type \
                    + "', @email = '" + \
                        user_data['email'] + "', @password = '" + \
                    user_data['password'] + "';"
                print(query)
                cursor.execute(str(query))
                user = cursor.fetchone()
                if user[0]:
                    print(str(user[0]))
                    # return the ID of the user
                    return({'user_type': user_type, 'id': str(user[0])})

            except KeyError:
                print('JSON did not hold reqired data')
                return {"error": "Request must contain required keys"}, 415
            except TypeError:
                print('Query returned no data')
                if user_type == user_types[len(user_types)-1]:
                    return {"message": "Request returned nothing"}, 200
    else:
        return {"error": "Request must be a JSON"}, 415


# calculates the percentage of a session that a muscle is activated for
@app.post("/sessions/percentage_muscle_activation")
def percentage_muscle_activation():
    if request.is_json:
        session_data = request.get_json()
        # set the dictionary for the total muscle movement in the session
        total_muscle_movement = {
            "right_quad": 0, "left_quad": 0, "right_hamstring": 0, "left_hamstring": 0}
        try:
            order_in_session = 1
            row = " "
            while row:
                query = "EXEC getDataEntry @session_id = " + str(session_data['session_id']) + \
                    ", @order_in_session = " + \
                    str(order_in_session) + ";"
                print(query)
                try:
                    # execute and commit the query
                    cursor.execute(str(query))
                    # there should only be one row returned
                    row = cursor.fetchone()
                    # if the muscles are activated, add it to the dictionary
                    if(row[4] > 300):
                        total_muscle_movement["left_hamstring"] += 1
                    if(row[5] > 300):
                        total_muscle_movement["right_hamstring"] += 1
                    if(row[6] > 300):
                        total_muscle_movement["left_quad"] += 1
                    if(row[7] > 300):
                        total_muscle_movement["right_quad"] += 1
                    order_in_session += 1
                except TypeError:
                    print('last data entry reached')
                    # if there are no entries in the database found for the id, return an error
                    if(order_in_session == 1):
                        return {"error": "no data for that session found"}
                    break
            percentage_muscle_movement = {
                "right_quad": 0, "left_quad": 0, "right_hamstring": 0, "left_hamstring": 0}
            # divide everything by the total number of entries (and multiply by 100) to get the percentage
            percentage_muscle_movement["left_hamstring"] = round(total_muscle_movement["left_hamstring"] /
                                                                 (order_in_session-1) * 100, 2)
            percentage_muscle_movement["right_hamstring"] = round(total_muscle_movement["right_hamstring"] /
                                                                  (order_in_session-1) * 100, 2)
            percentage_muscle_movement["left_quad"] = round(total_muscle_movement["left_quad"] /
                                                            (order_in_session-1) * 100, 2)
            percentage_muscle_movement["right_quad"] = round(total_muscle_movement["right_quad"] /
                                                             (order_in_session-1) * 100, 2)
            return json.dumps(percentage_muscle_movement), 200

        except KeyError:
            print('JSON did not hold reqired data')
            return {"error": "Request must contain required keys"}, 415
    else:
        return {"error": "Request must be a JSON"}, 415


# calculates the total activation (sum of all values) within a session for each muscle
@app.post("/sessions/total_muscle_activation")
def total_muscle_activation():
    if request.is_json:
        session_data = request.get_json()
        # set the dictionary for the total muscle movement in the session
        total_muscle_movement = {
            "right_quad": 0, "left_quad": 0, "right_hamstring": 0, "left_hamstring": 0}
        try:
            order_in_session = 1
            row = " "
            while row:
                query = "EXEC getDataEntry @session_id = " + str(session_data['session_id']) + \
                    ", @order_in_session = " + \
                    str(order_in_session) + ";"
                print(query)
                try:
                    # execute and commit the query
                    cursor.execute(str(query))
                    # there should only be one row returned
                    row = cursor.fetchone()
                    # if the muscles are activated, add the value to the dictionary
                    total_muscle_movement["left_hamstring"] += row[4]
                    total_muscle_movement["right_hamstring"] += row[5]
                    total_muscle_movement["left_quad"] += row[6]
                    total_muscle_movement["right_quad"] += row[7]
                    order_in_session += 1
                except TypeError:
                    print('last data entry reached')
                    # if there are no entries in the database found for the id, return an error
                    if(order_in_session == 1):
                        return {"error": "no data for that session found"}
                    break
            for key in total_muscle_movement:
                total_muscle_movement[key] = round(
                    total_muscle_movement[key] / order_in_session, 2)
            return json.dumps(total_muscle_movement), 200

        except KeyError:
            print('JSON did not hold reqired data')
            return {"error": "Request must contain required keys"}, 415
    else:
        return {"error": "Request must be a JSON"}, 415


# calculates the average muscle usage per session for a number of sessions
@app.post("/sessions/average_muscle_usage_progress")
def average_muscle_usage_progress():
    if request.is_json:
        user_details = request.get_json()

        # get the users last <number of sessions> sessions
        try:
            query = "EXEC getUserSessions @athlete_id = " + \
                str(user_details['athlete_id']) + ";"
            print(query)
            cursor.execute(str(query))
            # the no_of_sessions param allows you to specify the number
            # of sessions that you want to return, if not included, it will return all sessions
            if "no_of_sessions" not in user_details:
                sessions = cursor.fetchall()
            else:
                sessions = []
                row = cursor.fetchone()
                count = 0
                while row and count < user_details["no_of_sessions"]:
                    sessions.append(row)
                    row = cursor.fetchone()
                    count += 1
        except KeyError:
            print('JSON did not hold reqired data')
            return {"error": "Request must contain required keys"}, 415
        except TypeError:
            print('Query returned no data')
            return {"message": "Request returned nothing"}, 200
        # an array of dictionaries that store the client data
        session_array = []
        # go through each client and add their details to the array
        for session in sessions:
            array_entry = {'id': str(session[0]).rstrip(),
                           'date': str(session[1].day) + '/' + str(session[1].month) + '/' + str(session[1].year),
                           'comment': str(session[2]).rstrip()}
            session_array.append(array_entry)
        # now we have an array of all sessions that the user has done
        # we want the average muscle movement per session in the array
        for session in session_array:
            total_muscle_movement = {
                "right_quad": 0, "left_quad": 0, "right_hamstring": 0, "left_hamstring": 0}
            order_in_session = 1
            try:
                row = " "
                while row:
                    query = "EXEC getDataEntry @session_id = " + str(session['id']) + \
                        ", @order_in_session = " + \
                        str(order_in_session) + ";"
                    print(query)
                    try:
                        # execute and commit the query
                        cursor.execute(str(query))
                        # there should only be one row returned
                        row = cursor.fetchone()
                        # if the muscles are activated, add the value to the dictionary
                        total_muscle_movement["left_hamstring"] += row[4]
                        total_muscle_movement["right_hamstring"] += row[5]
                        total_muscle_movement["left_quad"] += row[6]
                        total_muscle_movement["right_quad"] += row[7]
                        order_in_session += 1
                    except TypeError:
                        print('last data entry reached')
                        # if there are no entries in the database found for the id, return an error
                        if(order_in_session == 1):
                            continue
                        break
                for key in total_muscle_movement:
                    total_muscle_movement[key] = round(
                        total_muscle_movement[key] / order_in_session, 2)
                # now we store the averages per session
                session["left_hamstring"] = total_muscle_movement["left_hamstring"]
                session["right_hamstring"] = total_muscle_movement["right_hamstring"]
                session["left_quad"] = total_muscle_movement["left_quad"]
                session["right_quad"] = total_muscle_movement["right_quad"]

            except KeyError:
                print('JSON did not hold reqired data')
                return {"error": "Request must contain required keys"}, 415
        # now return all the data for each session including the average muscle usage statistics per session
        return json.dumps({"sessions": session_array}), 200


# def run_query(query: str):
#     cursor.execute(query)
#     row = cursor.fetchone()
#     while row:
#         print(row[0])
#         row = cursor.fetchone()
