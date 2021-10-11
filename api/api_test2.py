import requests

response = requests.get("http://localhost:5000/sessions/get_user_sessions")
print(response.json())
