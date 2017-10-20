from app import db

class Metric(db.Model):
    __tablename__ = 'metric'

    id = db.Column(db.Integer, primary_key=True)
    hft_treatment_id = db.Column(db.Integer)
    algorithm = db.Column(db.String())
    f1_score = db.Column(db.Float())
    accuracy = db.Column(db.Float())

    def __init__(self, hft_treatment_id, algorithm, f1_score, accuracy):
        self.hft_treatment_id = hft_treatment_id
        self.algorithm        = algorithm
        self.f1_score         = f1_score
        self.accuracy         = accuracy

    def __repr__(self):
        return '<id {}>'.format(self.id)

