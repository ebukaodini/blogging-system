# Blogging System

## Description

A simple blogging system.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# start the app
$ npm run start:dev
```

## Endpoints

### Create User

POST http://localhost:3000/users

```json
// Body
{
  "username": "ebuka",
  "password": "P@ssw0rd"
}
```

### Login

POST http://localhost:3000/users/login

```json
// Body
{
  "username": "ebuka",
  "password": "P@ssw0rd"
}
```

### Create Post

POST http://localhost:3000/posts

```json
// Headers
{
  "Authorization": "Bearer {{authToken}}"
}
```

```json
// Body
{
  "title": "Hello",
  "content": "World"
}
```

### Fetch My Posts

GET http://localhost:3000/posts

```json
// Headers
{
  "Authorization": "Bearer {{authToken}}"
}
```

### Update Post

PATCH http://localhost:3000/posts/:id

```json
// Headers
{
  "Authorization": "Bearer {{authToken}}"
}
```

```json
// Body
{
  "title": "Hi",
  "content": "World"
}
```

### Delete Post

DELETE http://localhost:3000/posts/:id

```json
// Headers
{
  "Authorization": "Bearer {{authToken}}"
}
```