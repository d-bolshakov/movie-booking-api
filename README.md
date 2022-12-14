## Description

API for booking tickets at the cinema.

## Installation

```bash
$ npm install
```
The app requires PostgreSQL to be installed locally. Also you have to replace DB_PASSWORD variable in .production.env and .development.env with your Postgres superuser password.

Then use the following commands to create a database, its schemas and populate it with a seed data:

```bash
$ npm run dbcreate
$ npm run migrate
$ npm run seed
```

## Seed data

The seed data includes 3 users, 2 movies, 8 showtimes and 3 bookings.

Login credencials for demo users:

User 1:
email: user1@test.com,
password: user1

User 2:
email: user2@test.com,
password: user2

Administrator:
email: admin@test.com,
password: admin

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Documetation

Documentaion for endpoints is made using Swagger and available at: http://localhost:5000/api/docs#
