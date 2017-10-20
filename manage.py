import os
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from app import app, db

app.config.from_object(os.environ['APP_SETTINGS'])

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)


from models import Metric
@manager.command
def seed():
    metrics = []
    Metric.query.delete()
    metrics.append(Metric(119,"RF",0.894337665032553,0.905472637))
    metrics.append(Metric(120,"RF",0.917335953520164,0.928940568))
    metrics.append(Metric(121,"RF",0.899531572376053,0.915300546))
    metrics.append(Metric(122,"RF",0.910723531816324,0.985042735))
    metrics.append(Metric(123,"RF",0.906933609127805,0.944214876))
    metrics.append(Metric(124,"DT",0.933326070378037,0.941176471))
    metrics.append(Metric(125,"RF",0.88663967611336,0.925213675))
    metrics.append(Metric(126,"RF",0.900818713450292,0.977987421))
    metrics.append(Metric(129,"RF",0.878508264075144,0.892094017))
    metrics.append(Metric(130,"RF",0.892702980472765,0.931034483))
    metrics.append(Metric(131,"RF",0.899656744401005,0.917938931))
    metrics.append(Metric(132,"RF",0.928099332219125,0.977459016))
    metrics.append(Metric(133,"RF",0.903269144648455,0.939393939))
    metrics.append(Metric(134,"RF",0.900498831440465,0.922782875))
    metrics.append(Metric(137,"RF",0.883254514522951,0.892676768))
    metrics.append(Metric(139,"RF",0.936260288848436,0.94))
    metrics.append(Metric(140,"RF",0.917850824865265,0.932291667))
    metrics.append(Metric(142,"DT",0.911142282478278,0.920091324))
    metrics.append(Metric(143,"RF",0.870260169293572,0.9375))
    metrics.append(Metric(144,"RF",0.900160899541717,0.920411985))
    metrics.append(Metric(146,"RF",0.899926347726673,0.928571429))
    metrics.append(Metric(147,"RF",0.875163086772143,0.87962963))
    metrics.append(Metric(148,"RF",0.92516745245126,0.933531746))
    metrics.append(Metric(204,"RF",0.882339757956073,0.927083333))
    metrics.append(Metric(205,"RF",0.891324208168162,0.894444444))
    metrics.append(Metric(206,"RF",0.910835058661146,0.953431373))
    metrics.append(Metric(207,"DT",0.914001327140013,0.9296875))
    metrics.append(Metric(208,"DT",0.869112494332001,0.972222222))
    metrics.append(Metric(211,"RF",0.896172661870503,0.896464646))
    metrics.append(Metric(212,"DT",0.880626809062781,0.937198068))
    metrics.append(Metric(213,"RF",0.880837359098229,0.903645833))
    metrics.append(Metric(214,"RF",0.934469510305198,0.967299578))
    metrics.append(Metric(215,"ADA",0.922398589065256,0.977272727))
    metrics.append(Metric(216,"RF",0.917052425754938,0.923958333))
    metrics.append(Metric(220,"DT",0.914072685788787,0.914414414))
    metrics.append(Metric(221,"DT",0.875032749526677,0.917708333))
    metrics.append(Metric(222,"RF",0.86836797694999,0.894871795))
    metrics.append(Metric(223,"RF",0.943001443001443,0.985232068))
    metrics.append(Metric(224,"DT",0.896547812606345,0.917763158))
    metrics.append(Metric(225,"RF",0.887782922643526,0.979166667))
    metrics.append(Metric(226,"RF",0.868980863373387,0.928125))
    metrics.append(Metric(228,"RF",0.888384652889772,0.919270833))
    metrics.append(Metric(234,"RF",0.885836547733848,0.911255411))
    metrics.append(Metric(315,"RF",0.905608479806789,0.912935323))

    [db.session.add(metric) for metric in metrics]
    db.session.commit()

if __name__ == '__main__':
    manager.run()

