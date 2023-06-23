# SpaceCorp Test
RESTful API backend on Node.js using Nest.js and MongoDB

## Stack
- nest.js
- mongoose
- swagger
- typescript

## Features
- registration/authorization user
- jwt flow authentication user
- create/get/update/delete movies
- sorting when getting movies
- upload/serve static images for movies

## Access data

```bash
# authorization
login: test
password: 123

or

# authentication
access token: testAccessToken
```

## Database data

```bash
# database url
mongodb://localhost:27017

# database name
space-corp-test
```

## API documentation

```bash
# swagger
http://localhost:5001/api
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Build

```bash
# build
$ npm run build
```

## Format

```bash
# prettier
$ npm run format

# eslint
$ npm run lint
```


