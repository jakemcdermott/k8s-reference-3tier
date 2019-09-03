venv:
	virtualenv --python=python3 venv
	venv/bin/pip install -r backend/requirements-dev.txt

.PHONY: database
database: venv
	cd database && docker build -t postgresql:9.5 . && cd ..
	bash ./database/docker-dev.sh
	venv/bin/python backend/manage.py makemigrations api --noinput --settings=app.settings-dev
	venv/bin/python backend/manage.py migrate --noinput --settings=app.settings-dev
	venv/bin/python backend/manage.py configure_site_domain --name="app" --domain="localhost:3000"

fixtures: venv
	venv/bin/python backend/manage.py createsuperuser --username=root --email=root@example.com --noinput --settings=app.settings-dev
	venv/bin/python backend/manage.py create_fixtures --settings=app.settings-dev

clean-py: venv
	venv/bin/python -c "import pathlib; [p.unlink() for p in pathlib.Path('./backend').rglob('*.py[co]')]"
	venv/bin/python -c "import pathlib; [p.rmdir() for p in pathlib.Path('./backend').rglob('__pycache__')]"
	find . -path "./backend/app/api/migrations/*.py" -not -name "__init__.py" -exec rm {} \;
	#git checkout ./backend/app/api/migrations

backend-dev: venv clean-py database fixtures
	venv/bin/python  backend/manage.py runserver --settings=app.settings-dev

frontend/node_modules:
	yarn --cwd=./frontend install

frontend-dev: frontend/node_modules
	yarn --cwd=./frontend run start
