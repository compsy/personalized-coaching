from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from wtforms import Form, TextAreaField, TextField, SelectField, validators
from pickle import UnpicklingError
import pickle
import os
from os import listdir
from os.path import isfile, join
import numpy as np
import sklearn

# Load the application
app = Flask(__name__)

# For this app it is fine to receive calls from other urls (this should
# probably not be used in a real, production environment)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models import Metric

######## Preparing the Classifier
cur_dir = os.path.dirname(__file__)
app.static_folder = 'static'
pickle_dir = os.path.join(cur_dir,'pkl_objects')

def classify(algorithm,treatment_id,hour,steps_hour,steps_total):
    label = {0: 'negative', 1: 'positive'}
    try:
        # TODO: This is not safe.
        file_name = os.path.join(pickle_dir,str(treatment_id) + '_' + algorithm + '_model.pkl')
        clf = pickle.load(open(file_name, 'rb'))
        # X = (np.array([day,hour,steps_hour,steps_total]).reshape(-1, 4))
        X = (np.array([hour,steps_hour,steps_total]).reshape(-1, 3))
        X = X.astype(int)
        y = clf.predict(X)[0]
        proba = np.max(clf.predict_proba(X))
        return label[y], proba

    except (FileNotFoundError, ValueError, EOFError, UnpicklingError):
        return 'not found', 0

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/participants', methods=['GET'])
def get_participants():
    particpant_ids = [p.hft_treatment_id for p in Metric.query.distinct('hft_treatment_id').all()]
    return jsonify(particpant_ids)

@app.route('/details', methods=['GET'])
def details():
    user_id = int(request.args.get('user_id'))
    # TODO: This could be sql injectable? Not a concern in this demo app, but check it when using it.
    results  = [m.to_json() for m in Metric.query.filter_by(hft_treatment_id=user_id).all()]
    return jsonify(results)

@app.route('/calculate', methods=['POST'])
def calculate():
    data         = request.get_json()
    treatment_id = int(data[ 'treatment_id' ])
    hour         = int(data[ 'hour' ])
    steps_hour   = int(data[ 'steps_hour' ])
    steps_total  = int(data[ 'steps_total' ])
    algo         = data[ 'algorithm' ]
    y, proba = classify(algo, treatment_id,hour,steps_hour,steps_total)
    return jsonify(treatment_id=treatment_id,
                            hour=hour,
                            steps_last_hour=steps_hour,
                            steps_total=steps_total,
                            prediction=y,
                            probability=round(proba*100, 2))

if __name__ == '__main__':
    app.run(host='0.0.0.0')
