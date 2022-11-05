# Storefront Backend Project

## Setup

### PostgreSQL

Make sure that you habe PostgreSQL installed

```
postgres --version
```

Start Postgres with

```
(sudo) su - postgres
```

and enter the Postgres terminal with

```
psql postgres
```

Create the database

```
CREATE DATABASE <db_name>;
```

Create a user and grant access to this database

```
CREATE USER <user_name> WITH PASSWORD '<password>';

GRANT ALL PRIVILEGES ON DATABASE <db_name> TO <user_name>;
```

Connect to the database

```
\c <db_name>
```

Display the tables (no relations should be found)

```
\dt
```

Now that you can create a database and a user, you should create one database (with a user) for production and one database (with a user - you can use the same as for the dev db) for testing.

.env file (from [dotenv](https://www.npmjs.com/package/dotenv)) accordingly:

```

DB_HOST = "<where you DB is hosted (for development usually localhost)>"
DB_NAME = "<db_name>"
DB_USER = "<user_name>"
DB_PORT = "<db_port>"
DB_PASSWORD = "<password>"
TEST_DB_NAME = "<db_name>" (for tests)
```

Other environment variables that are necessary

```
ENV = "dev" (run with dev db or test db)
BCRYPT_PW = "<write some string to pepper your encryption>"
SALT_ROUNDS = "<write an integer to say how many times the pw should be hashed>"
TOKEN_SECRET = "<write a string for the JWT secret>"
```

Install the node modules

```
npm install
```

Load the database schema with

```
db-migrate up
```

Run the jasmine test  

```
npm run test
```


you can start this API with

```
npm run watch
```

The server runs on localhost:3000 on default.

## Routes and Database Schemas

Show and Index routes never require a token.
Create, Update and Delete routes usually do.

### /users

The user consists out of
- id 
- first_name
- last_name
- password

Creating the user doesn't need a token. You can get the token of this user
```
curl -H "Content-Type: application/json" -X POST -d '{"fisrtName":"Ada","lastName":"Choo","password":"123"}' http://localhost:3000/users
```

The passwords gets hashed with bcrypt.

Get user info 

(GET /users/:id) you also get the user by id, this method needs token

```
curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDksImZpcnN0X25hbWUiOm51bGwsImxhc3RfbmFtZSI6IkNob28iLCJwYXNzd29yZCI6IiQyYiQxMCRxOXNUVkh5bWRyd2xrYXJHcnQ2Z051MTFFSHlIUGUxY2pTMU5zNDBDSXI4cEs2Y2hGREZ5SyJ9LCJpYXQiOjE2Njc2Mzk2OTh9.D2D7TBhLy3h5Sz-Fm4boP39VR0ZT-rt-6xVngqjCMTY" -X GET http://localhost:3000/users/{id}
```

Get all users info 

(GET /users) you also get all the users, this method needs token

```
curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDksImZpcnN0X25hbWUiOm51bGwsImxhc3RfbmFtZSI6IkNob28iLCJwYXNzd29yZCI6IiQyYiQxMCRxOXNUVkh5bWRyd2xrYXJHcnQ2Z051MTFFSHlIUGUxY2pTMU5zNDBDSXI4cEs2Y2hGREZ5SyJ9LCJpYXQiOjE2Njc2Mzk2OTh9.D2D7TBhLy3h5Sz-Fm4boP39VR0ZT-rt-6xVngqjCMTY" -X GET http://localhost:3000/users
```

### /products

The product consists out of
- id
- name
- price
- category

The usual CRUD routes are implemented, you need a user token for all manipulating routes.

create the product 
```
curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDksImZpcnN0X25hbWUiOm51bGwsImxhc3RfbmFtZSI6IkNob28iLCJwYXNzd29yZCI6IiQyYiQxMCRxOXNUVkh5bWRyd2xrYXJHcnQ2Z051MTFFSHlIUGUxY2pTMU5zNDBDSXI4cEs2Y2hGREZ5SyJ9LCJpYXQiOjE2Njc2Mzk2OTh9.D2D7TBhLy3h5Sz-Fm4boP39VR0ZT-rt-6xVngqjCMTY" -X POST http://localhost:3000/products
```


### /orders

The order consists out of
- id
- user_id
- status

The order-product consists out of 
- id
- order_id
- product_id
-quantity
  
The order stores orders connected to a specific users and saves the current status (active or finished).
You can create the order (we also create the order-product together) by call the post method /orders

```
curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDksImZpcnN0X25hbWUiOm51bGwsImxhc3RfbmFtZSI6IkNob28iLCJwYXNzd29yZCI6IiQyYiQxMCRxOXNUVkh5bWRyd2xrYXJHcnQ2Z051MTFFSHlIUGUxY2pTMU5zNDBDSXI4cEs2Y2hGREZ5SyJ9LCJpYXQiOjE2Njc2Mzk2OTh9.D2D7TBhLy3h5Sz-Fm4boP39VR0ZT-rt-6xVngqjCMTY" -X POST -d '{"userId":1,"quantity":5,"productId":1,"status":"active"}' http://localhost:3000/orders
```

You can also get the user's all orders by the method /orders?userId={id}
you need a user token for all manipulating routes.

```
curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDksImZpcnN0X25hbWUiOm51bGwsImxhc3RfbmFtZSI6IkNob28iLCJwYXNzd29yZCI6IiQyYiQxMCRxOXNUVkh5bWRyd2xrYXJHcnQ2Z051MTFFSHlIUGUxY2pTMU5zNDBDSXI4cEs2Y2hGREZ5SyJ9LCJpYXQiOjE2Njc2Mzk2OTh9.D2D7TBhLy3h5Sz-Fm4boP39VR0ZT-rt-6xVngqjCMTY" -X GET http://localhost:3000/orders?userId=1
```

