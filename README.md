# Bug Tracker

> This a nodejs api for a bug tracker system.

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)
- [Contact](#contact)

## General info

This api only supports json format files. Some of the features are add users, projects, issues and comments for it.

## Technologies

- body-parser - version 1.19.0
- cors - version 2.8.5
- express - version 2.8.5
- mongodb - version 3.6.2
- nodemailer - version 6.4.16
- bcrypt - version 5.0.0

# Setup

- Setup a MongoDB
- Create your ENV variables: EMAIL(gmail), PASSWORD(of email), MONGO_URI
- Set the variables to your environment

## NPM installation

Clone the repository

```git
$ git clone https://github.com/Altemir-Ap/bug-tracker-ca
```

Install the dependencies

```js
$ npm install
```

Run the code

```js
$ npm start
```

## Docker

Pull the image

```docker
docker pull alt1993/bug-tracker-ca
```

Run the container

```docker
docker run -d -p 3000:3000 --rm --name CONTAINER_NAME IMAGE_ID
```

## Endpoints

GET
`get all users` /users \
**Response**

```json
[
  {
    "_id": "5f92cc2ab6e47f12b69e5165",
    "name": "sadf",
    "email": "asdf@gmail.com",
    "usertype": "admin",
    "key": "7142ys87df8sdf78a9"
  },
...
]
```

GET
`get a user by email` /users/:email \
**Response**

```json
{
  "_id": "5f92cc2ab6e47f12b69e5165",
  "name": "sadf",
  "email": "asdf@gmail.com",
  "usertype": "admin",
  "key": "7142ys87df8sdf78a9"
}
```

POST
`insert a user` /users/:email \
**Body request**

```json
{
  "name": "sadf",
  "email": "sdaf@gmail.com",
  "usertype": "admin",
  "key": "your password"
}
```

GET `get all projects` /projects \
**Response**

```json
[
  {
    "_id": "5f9321c5a682d88ee28a3f05",
    "slug": "BOOKS",
    "name": "A book store",
    "description": "A project for tracking issues in a book store"
  },
...
]
```

GET `get a single project` /projects/:slug \
**Response**

```json
{
  "_id": "5f9321c5a682d88ee28a3f05",
  "slug": "BOOKS",
  "name": "A book store",
  "description": "A project for tracking issues in a book store"
}
```

POST `insert a project` /projects \
**Request body**

```json
{
  "slug": "BOOKS",
  "name": "A book store",
  "description": "A project for tracking issues in a book store"
}
```

GET `get all issues` /issues \
**Response**

```json
[
  {
    "_id": "5f934292b449e7266985284f",
    "issueNumber": "BOOKS-1",
    "title": "To fix",
    "description": "First Issue",
    "status": "open",
    "project_id": "5f9321c5a682d88ee28a3f05",
    "comments": [
      {
        "_id": "5f97359739a349041af9b43e",
        "text": "altemir",
        "author": "alt@gmail.com"
      },
    ]
  }
...
]
```

GET `get a issue by issueNumber` /issues/:issueNumber \
**Response**

```json
{
  "_id": "5f934292b449e7266985284f",
  "issueNumber": "BOOKS-1",
  "title": "To fix",
  "description": "First Issue",
  "status": "open",
  "project_id": "5f9321c5a682d88ee28a3f05",
  "comments": [
    {
      "_id": "5f97359739a349041af9b43e",
      "text": "altemir",
      "author": "alt@gmail.com"
    }
  ]
}
```

GET `get all issues for a project` /projects/:projectSlug/issues \
**Response**

```json
[
  {
    "_id": "5f934292b449e7266985284f",
    "issueNumber": "BOOKS-1",
    "title": "To fix",
    "description": "First Issue",
    "status": "open",
    "project_id": "5f9321c5a682d88ee28a3f05",
    "comments": [
      {
        "_id": "5f97359739a349041af9b43e",
        "text": "altemir",
        "author": "alt@gmail.com"
      },
    ]
  },
  {
    "_id": "5f934292b449e7266985284f",
    "issueNumber": "BOOKS-2",
    "title": "To fix",
    "description": "First Issue",
    "status": "open",
    "project_id": "5f9321c5a682d88ee28a3f05",
    "comments": [
      {
        "_id": "5f97359739a349041af9b43e",
        "text": "altemir",
        "author": "alt@gmail.com"
      },
    ]
  }
...
]
```

POST `add a issue for a project` /projects/:slugName/issues \
**Request body**

```json
{
  "title": "To fix",
  "description": "First Issue",
  "status": "open"
}
```

PUT `update the status for an issue` /projects/issues/:issueNumber/ \
**Request body**

```json
{
  "status": "wip"
}
```

PUT `Add a due date for an issue` /issues/:issueNumber \
**Request body**

```json
{
  "dueDate": "25-11-2020"
}
```

GET `get all comments for an user` /comments/:email \
**Response**

```json
[
    {
    "_id": "5f95a7874e1c3c4613e4f7e0",
    "issueNumber": "BUG-3",
    "comments": [
      {
        "_id": "5f97480ff85238adcf5be6b4",
        "text": "just a 2",
        "author": "alt@gmail.com"
      }
    ]
  }
    {
    "_id": "5f95a7874e1c3c4613e4f7e0",
    "issueNumber": "BUG-4",
    "comments": [
      {
        "_id": "5f97480ff85238adcf5be6b4",
        "text": "just a 2",
        "author": "alt@gmail.com"
      }
       {
        "_id": "5f97480ff85238adcf5be6b4",
        "text": "just a 2",
        "author": "alt@gmail.com"
      }
    ]
  }
...
]
```

GET `get all comments` /comments \
**Response**

```json
[
  {
    "issueNumber": "BOOKS-1",
    "comments": [
      {
        "_id": "5f97359739a349041af9b43e",
        "text": "altemir",
        "author": "alt@gmail.com"
      },
      ...
    ]
  }
   {
    "issueNumber": "BOOKS-2",
    "comments": [
      {
        "_id": "5f97359739a349041af9b43e",
        "text": "altemir",
        "author": "alt@gmail.com"
      },
      ...
    ]
  }
]
```

GET `get all comments for an issue` /issues/:issueNumber/comments \
**Response**

```json
[
  {
    "issueNumber": "BOOKS-1",
    "comments": [
      {
        "_id": "5f97359739a349041af9b43e",
        "text": "altemir",
        "author": "alt@gmail.com"
      },
      ...
    ]
  }
]
```

GET `get a single comment` /issues/:issueNumber/comments/:commentId \
**Response**

```json
[
  {
    "issueNumber": "BOOKS-1",
    "comments": [
      {
        "_id": "5f97359739a349041af9b43e",
        "text": "altemir",
        "author": "alt@gmail.com"
      }
    ]
  }
]
```

POST `insert a comment` /issues/:issueNumber/comments \
**Request Body**

```json
{
  "text": "altemir",
  "author": "alt@gmail.com"
}
```

## Features

List of features ready and TODOs for future development

- Add issues, projects, users and comments
- Retrieve items above, all of them and individualy

To-do list:

- Change authentication method to JWT
- Start unit tests
- Add issue linking
- Start front-end

## Status

Project is in progress, there are some new features yet to be implemented

## Contact

Created by [Altemir](https://github.com/Altemir-Ap) - feel free to contact me!

```

```
