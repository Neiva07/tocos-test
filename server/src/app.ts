import express, { Application } from 'express';
const app: Application = express();
require("dotenv").config();
import { MongoClient } from 'mongodb';
import { setRoutes } from './router';

const PORT = process.env.NODE_DOCKER_PORT || 8080;
const { DB_USER, DB_PASSWORD, DB_PORT, DB_HOST, DB_NAME } = process.env
const mongodbURI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
export let dbClient: MongoClient;

const connectToMongo = async () => {
  let mongoClient;

  try {
    mongoClient = new MongoClient(mongodbURI);
    console.log('Connecting to MongoDB Atlas cluster...');
    await mongoClient.connect();
    console.log('Successfully connected to MongoDB!');
    dbClient = mongoClient;

  } catch (error) {
    console.error('Connection to MongoDB!', error);
    process.exit();
  }
}
// Add headers before the routes are defined
app.use(function(req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
});

setRoutes(app);

connectToMongo();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
