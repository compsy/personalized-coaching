#!/bin/bash
set -a
. ./.env
set +a
FLASK_APP=app.py FLASK_DEBUG=1 python -m flask run
