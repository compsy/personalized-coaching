Instal reqs
```
pip install -r requirements.txt
```


Create db
```
psql --host docker.dev --port 5432 --username frbl
frbl=# create database personalized_coaching;
frbl=# \q

```

Set correct env vars
```
  export APP_SETTINGS="config.DevelopmentConfig"
  export DATABASE_URL="postgresql://docker.dev/personalized_coaching"
```

Create migrations
```
  python manage.py db init
```

Run the migrations
```
  python manage.py db migrate
```



# On heroku:
1. Set config vars for app_settings
1. heroku addons:create heroku-postgresql:hobby-dev --app personalized-coaching
1. Push to heroku

1. Run migrations:
```
  heroku run python manage.py db upgrade --app personalized-coaching
```

1. Run seeds:
```
  heroku run python manage.py seed
```

all set!
