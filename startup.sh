python3 -m virtualenv ./venv
source ./venv/bin/activate

pip3 install -r requirements.txt

cd fitness_club
python3 manage.py makemigrations accounts
python3 manage.py makemigrations studios
python3 manage.py migrate
cd ..
source ./venv/bin/activate
cd fitness_club
