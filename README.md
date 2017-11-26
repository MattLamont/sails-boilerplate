# Sails Boilerplate

## Features
* Passport Local Authorization
* Passport Bearer Authorization
* Admin and Owner Access Control Policies
* Example Flavor Api with access Control
* PostgreSQL database connection

## Available Routes:
* POST /register (with new email & password key value)
* POST /auth/login (with existed email & password key value) -> return token
* GET /auth/validate_token (with key:Authorization & value: 'Bearer `<your valid token>`' in header)

* GET /user
* GET /user/:id
* POST /user
* PUT /user/:id
* DELETE /user/:id

* GET /flavor
* GET /flavor/:id
* POST /flavor
* PUT /flavor/:id
* DELETE /flavor/:id
