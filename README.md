# Installation and configuration
To configure the project to execute and test the system you need to execute the following code starting from the root directory of the project:
```
cd api/
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py runserver
cd ../frontend/
npm i
npm run start
```