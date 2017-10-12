from flask import Flask, render_template, request, jsonify
from wtforms import Form, TextAreaField, TextField, SelectField, validators
from pickle import UnpicklingError
import pickle
import sqlite3
import os
from os import listdir
from os.path import isfile, join
import numpy as np
import sklearn
# import HashingVectorizer from local dir
#from vectorizer import vect
app = Flask(__name__)

######## Preparing the Classifier
cur_dir = os.path.dirname(__file__)
db = os.path.join(cur_dir, 'fitbitwebdata.sqlite')
app.static_folder = 'static'
pickle_dir = os.path.join(cur_dir,'pkl_objects')

def classify(treatment_id,day,hour,steps_hour,steps_total):
    label = {0: 'negative', 1: 'positive'}
    try:
        clf = pickle.load(open(os.path.join(pickle_dir,str(treatment_id)+ '_LG_model.pkl'),'rb'))
        X = (np.array([day,hour,steps_hour,steps_total]).reshape(-1, 4))
        X = X.astype(int)
        y = clf.predict(X)[0]
        proba = np.max(clf.predict_proba(X))
        return label[y], proba

    except (FileNotFoundError, ValueError, EOFError, UnpicklingError):
        return 'no data found', 0

#def sqlite_entry(path, week,day,hour,y):
#    conn = sqlite3.connect(path)
#    c = conn.cursor()
#    c.execute("INSERT INTO prediction_asked (treatment_id,day,hour,steps_hour,steps_total,date)" "VALUES (?,?,? DATETIME('now'))", (treatment_id,day,hour,steps_hour,steps_total))
#    conn.commit()
#    conn.close()

app = Flask(__name__)
class DataForm(Form):
    pickle_files = [(f[0:4], f[0:4]) for f in listdir(pickle_dir) if isfile(join(pickle_dir, f))]
    treatment_id = SelectField("Treatmentid",
                                choices = pickle_files,
                                validators = [validators.DataRequired(),
                                validators.length(min=1)])

    # treatment_id = TextField("Treatment id", 
                            # [validators.DataRequired(),
                             # validators.length(min=1)])
    day = TextField("Day", [validators.DataRequired(),
                            validators.length(min=1)])
    hour = TextField("Hour", [validators.DataRequired(),
                             validators.length(min=1)])
    steps_hour =  TextField("Stepsperhour", [validators.DataRequired(),
                             validators.length(min=1)])
    steps_total = TextField("Stepsintotal",
                            [validators.DataRequired(),
                             validators.length(min=1)])



@app.route('/')
def index():
    form = DataForm(request.form)
    return render_template('testdata.html', form=form)

@app.route('/results', methods=['POST'])
def results():
    form = DataForm(request.form)
    if request.method == 'POST' and form.validate():
        treatment_id = request.form['treatment_id']
        day = request.form['day']
        hour = request.form['hour']
        steps_hour =request.form['steps_hour']
        steps_total = request.form['steps_total']
        wdh1 = 'Treatment_id : '+treatment_id
        wdh2 = 'Day: '+day
        wdh3 = 'Hour: '+hour
        wdh4 = 'Steps hour: '+steps_hour
        wdh5 = 'Steps total: '+steps_total
        y, proba = classify(treatment_id,day,hour,steps_hour,steps_total)
        return jsonify(treatment_id=wdh1,
                                day=wdh2,
                                hour=wdh3,
                                steps_last_hour=wdh4,
                                steps_total=wdh5,
                                prediction=y,
                                probability=round(proba*100, 2))
    return render_template('testdata.html', form=form)

@app.route('/thanks', methods=['POST'])

def result():
    result = request.form['result_button']
    review = request.form['review']
    prediction = request.form['prediction']

    inv_label = {'negative': 0, 'positive': 1}
    y = inv_label[prediction]
    if feedback == 'Incorrect':
        y = int(not(y))
     #train(review, y)
    sqlite_entry(db, treatment_id,day,hour,steps_hour,steps_total, y)
    return render_template('thanks.html')

if __name__ == '__main__':
    app.run(debug=True)
