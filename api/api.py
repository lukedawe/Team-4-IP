import requests

response = requests.get("http://localhost:5000/countries")
print(response.json())
