FROM ubuntu:latest

MAINTAINER Frank Blaauw "f.j.blaauw@rug.nl"

RUN apt-get update -y

RUN apt-get install -y python-pip python-dev build-essential

COPY . /app

WORKDIR /app

EXPOSE 80

RUN pip install -r requirements.txt

CMD ["python", "app.py"]
