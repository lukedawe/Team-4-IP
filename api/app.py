from flask import Flask, request, jsonify
from requests.sessions import merge_cookies

app = Flask(__name__)

muscles = [
    {"id": 1, "name": "Left Hamstring",
        "Date and Time": "2021-08-19T10:20:43.703Z", "value": 863},
    {"id": 2, "name": "Right Hamstring",
        "Date and Time": "2021-08-19T10:20:43.703Z", "value": 20},
    {"id": 3, "name": "Left Quadricep",
        "Date and Time": "2021-08-19T10:20:43.703Z", "value": 44},
    {"id": 4, "name": "Right Quadricep",
        "Date and Time": "2021-08-19T10:20:43.703Z", "value": 70}
]


def _find_next_id():
    return max(muscle["id"] for muscle in muscles) + 1


@app.get("/muscles")
def get_countries():
    return jsonify(muscles)


@app.post("/muscles")
def add_country():
    if request.is_json:
        muscle = request.get_json()
        muscle["id"] = _find_next_id()
        muscles.append(muscle)
        return muscle, 201
    return {"error": "Request must be JSON"}, 415
