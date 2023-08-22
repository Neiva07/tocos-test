import { ObjectId } from "mongodb";
import { dbClient } from "../app";
import { CreateTransactionRequest } from "../controllers/transactions.controllers"
import { User } from "../mondels/users";
import { NotFoundError, queryUser } from "./users.service"

export class ReceiverNotFoundError extends NotFoundError { }
export class SenderNotFoundError extends NotFoundError { }

export class TransactionBalanceError extends Error { }

export interface Transaction {
  id: string;
  sender: User;
  receiver: User;
  amount: number;
  datetime: number;
}


const TRANSACTIONS_COLLECTION = "trasactions"


export const executeTransaction = async (request: CreateTransactionRequest) => {
  let sender: User | undefined, receiver: User | undefined;


  try {
    sender = await queryUser(request.senderId);
  } catch (e) {
    if (e instanceof NotFoundError) {
      return new SenderNotFoundError("Sender not found");
    }
  }


  try {
    receiver = await queryUser(request.receiverId);
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw new ReceiverNotFoundError("Receiver not found");
    }
  }

  if (!sender || !receiver) {
    throw new Error("Something went wrong")
  }
  if (sender.tocos < request.amount) {
    throw new TransactionBalanceError("Sender does not have balance for the transaction")
  }

  const datetime = Date.now();

  sender.tocos -= request.amount;
  receiver.tocos += request.amount;

  sender.updatedAt = datetime;
  receiver.updatedAt = datetime;

  const transaction: Partial<Transaction> = {
    sender,
    receiver,
    amount: request.amount,
    datetime,
  }


  try {
    const res = await dbClient.db().collection(TRANSACTIONS_COLLECTION).insertOne(transaction)

    await dbClient.db().collection("users").bulkWrite([
      { updateOne: { filter: { _id: new ObjectId(sender!.id) }, update: { $set: sender! }, upsert: true } },
      { updateOne: { filter: { _id: new ObjectId(receiver!.id) }, update: { $set: receiver! }, upsert: true } },
    ])

    return { ...transaction, id: res.insertedId };
  } catch (e) {
    console.error("Something went wrong executing the transaction.", e)
    throw e;
  }
}


export const getTransactionsList = async () => {

  const docs = await dbClient.db().collection(TRANSACTIONS_COLLECTION).find().toArray();

  return docs.map(doc => {
    const { _id, ...transactionData } = doc;
    return {
      ...transactionData,
      id: _id,
    }
  })
}
