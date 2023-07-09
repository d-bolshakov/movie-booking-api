## Description

API for booking tickets at the cinema.

## Installation

The app is dockerized so it requires only installation of the dependencies.

```bash
$ npm ci
```

## Running the app

To run the app in development environment run:

```bash
$ docker-compose -f docker-compose.dev.yml up
```

To run the app in production environment run:

```bash
$ docker-compose up
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

## Endpoints

### Authorization

**POST /api/auth/registration** 

Registration of a new user.

The body of the request:

```
{
  "username": "sample_username",
  "email": "sample@mail.com",
  "password": "sample_password"
}
```
Returns user's data, access token and cookie with refresh token.

**POST /api/auth/login** 

Loging in. 
The Body of the request:

```
{
  "email": "sample@mail.com",
  "password": "sample_password"
}
```
Returns user's data, access token and cookie with refresh token.

**GET /api/auth/logout** 

Logging out.
Requires 'Authorization' header with Bearer access token.

**GET /api/auth/refresh** 

Refreshing the access token.
Requires a cookie with the refresh token.

### Movies

**GET /api/movies/** 

Getting a list of the movies.

**GET /api/movies/:id** 

Getting a movie by it's id.

**POST /api/movies/** 

Creating a new movie. Availdable only for users with 'admin' role.
Requires 'Authorization' header with Bearer access token.
The request should have "multipart/form-data" type.
The body of the request:

```
{
  "title": "sample_title",
  "director": "sample_director",
  "genres": "sample_genre_1, sample_genre_2",
  "releaseDate": "2023-07-10",
  "cover": image_with_movie_cover
}
```
Returns the created movie.

**PUT /api/movies/:id** 

Editing a movie. Availdable only for users with 'admin' role.
Requires 'Authorization' header with Bearer access token.
The request should have "multipart/form-data" type.
The body of the request:

```
{
  "title": "sample_title",
  "director": "sample_director",
  "genres": "sample_genre_1, sample_genre_2",
  "releaseDate": "2023-07-10",
  "cover": image_with_movie_cover
}
```
Returns the edited movie.

**DELETE /api/movies/:id** 

Deleting a movie. Availdable only for users with 'admin' role.
Requires 'Authorization' header with Bearer access token.

### Showtimes

**GET /api/showtimes/** 

Getting a list of the showtimes. Accepts filtering query params: "movieId", "startDate" and "endDate".

**GET /api/showtimes/:id** 

Getting a movie by it's id.

**GET /api/showtimes/:id/bookings** 

Getting a list of the bookings for the showtime. Availdable only for users with 'admin' role.
Requires 'Authorization' header with Bearer access token.
The request should have "multipart/form-data" type.

**POST /api/showtimes/** 

Creating a new showtime. Availdable only for users with 'admin' role.
Requires 'Authorization' header with Bearer access token.
The body of the request:

```
{
  "movieId": sample_movie_id,
  "hallId": sample_hall_id,
  "seatsCount": sample_seats_count,
  "datetime": "2023-07-10T12:00:00Z"
}
```
Returns the created showtime.

**PUT /api/showtimes/:id** 

Editing a showtime. Availdable only for users with 'admin' role.
Requires 'Authorization' header with Bearer access token.
The body of the request:

```
{
  "movieId": sample_movie_id,
  "hallId": sample_hall_id,
  "seatsCount": sample_seats_count,
  "datetime": "2023-07-10T12:00:00Z"
}
```
Returns the edited showtime.

**DELETE /api/showtimes/:id** 

Deleting a showtime. Availdable only for users with 'admin' role.
Requires 'Authorization' header with Bearer access token.

### Bookings

**POST /api/auth/bookings** 

Creating a new booking.
Requires 'Authorization' header with Bearer access token.
The body of the request:

```
{
  "showtimeId": sample_showtime_id,
  "seat": sample_seat
}
```
Returns the created booking.

**DELETE /api/bookings/:id** 

Cancelling a booking.
Requires 'Authorization' header with Bearer access token.

**PUT /api/bookings/:id** 

Changing the status of the booking to "paid". Availdable only for users with 'admin' role.
Requires 'Authorization' header with Bearer access token.

**GET /api/bookings** 

Getting a list of the bookings made by user.
Requires 'Authorization' header with Bearer access token.

## Documetation

Documentaion for endpoints is made using Swagger and available at: http://localhost:5000/api/docs#
