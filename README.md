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

create a `.env` file with the variables suggested on the `.env.example`

$ docker-compose build && docker-compose up 
```

The project now is up and runnning


You can access the WebApp on http://localhost:3000

## Testing 

You can run the integration tests by running:

```
$ docker-compose run app yarn test
```

### API - Overview 

The project is composed by 3 main REST APIs:

**GET - /api/v1/users/{id}**

**POST - /api/v1/users**

**POST - /api/v1/transactions**

There's also 2 additional APIs to facilitate the visualization of the database listing all the records 

**GET - /api/v1/users**

**GET - /api/v1/transactions**



### API Docs 

All POST APIs fails when you do not provide correct body format with 422.

#### POST - /api/v1/users


```
$ curl -X POST http://localhost:6868/api/v1/users -H "Content-Type: application/json" -d '{
  "email": "jhon@gmail.com",
  "name": "jhon",
  "tocos": 20
}'
```

Successful response:

```
{"user":{"email":"jhon@gmail.com","name":"jhon","tocos":20,"createdAt":1692705930321,"id":"64e4a48ad9274059808e6c70"}}
```

#### GET - /api/v1/users/{id}


```
$ curl -X GET http://localhost:6868/api/v1/users/xxxxxx
```

Successful response:

```
{"user":{"_id":"64e4a48ad9274059808e6c70","email":"myemail@gmail.com","name":"jhon","tocos":200,"createdAt":1692705930321,"id":"64e4a48ad9274059808e6c70"}}
```

#### POST - /api/v1/transactions

```
$ curl -X POST http://localhost:6868/api/v1/transactions -H "Content-Type: application/json" -d '{
  "senderId": "xxxxxxxxxx",
  "receiverId": "xxxxxxxxx",
  "amount": 20
}'
```

Successful response

```
{
    "sender":{"email":"xxxxxxx@xxxx.com","name":"xxxx","tocos":140,"createdAt":1692528980734,"id":"xxxxxxxx","updatedAt":1692706119800},
    "receiver":{"email":"xxxx@xxxxx.com","name":"xxxxx","tocos":90,"createdAt":1692451334463,"id":"xxxxxx","updatedAt":1692706119800},
    "amount":20,
    "datetime":1692706119800, 
    id":"xxxxxxxxxx"
}
```

If Sender does not have balance for the transaction it will receive a message:

```
Sender does have sufficient balance
```

with 422 status code

