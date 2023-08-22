# Take Home Assignment for Tocos

Test instructions: [senior-software-engineer-test](https://github.com/tocos-org/hiring-tasks/tree/main/principal-and-senior-software-engineer)


### Prerequisites

The things you need before installing the software.

* docker installed 
* docker-compose installed 

### Run the project 

A step by step guide that will tell you how to get the development environment up and running.

```
$ git clone git@github.com:Neiva07/tocos-test.git
$ cd tocos-test/server 
$ docker-compose build && docker-compose up 
```

The project now is up and runnning

## Testing 

You can run the integration tests by running:

```
$ docker-compose run app yarn test
```

### API - Overview 

The project is composed by 3 main REST APIs:

GET - /api/v1/users/{id}
POST - /api/v1/users
POST - /api/v1/transactions

There's also 2 additional APIs to facilitate the visualization of the database listing all the records 

GET - /api/v1/users
GET - /api/v1/transactions

### API Docs 

#### POST - /api/v1/users/{id}


```
$ curl -X POST http://localhost:6868/api/v1/users -H "Content-Type: application/json" -d '{
  "email": "xxxx@xxxx.com",
  "name": "xxxxx",
  "tocos": 20
}'```



