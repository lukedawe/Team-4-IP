pip install flask
pip install pyodbc
pip install -U flask-cors
pip install requests

cd ./api
set FLASK_APP=app.py
set FLASK_ENV=developmemt

flask run