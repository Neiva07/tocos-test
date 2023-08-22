import { Application } from "express";
import { createUser, createUserValidation, getUser, getUserValidation, listUsers } from "./controllers/users.controllers";
import bodyParser from "body-parser";
import { createTransaction, createTransactionValidation, listTransactions } from "./controllers/transactions.controllers";

const jsonParser = bodyParser.json()

export const setRoutes = (app: Application) => {
  //user apis
  app.get('/api/v1/users/:id', getUserValidation, getUser);
  app.get('/api/v1/users', listUsers);
  app.post('/api/v1/users', jsonParser, createUserValidation, createUser);

  //transaction apis
  app.post('/api/v1/transactions', jsonParser, createTransactionValidation, createTransaction);
  app.get('/api/v1/transactions', listTransactions);

}
