import { NextFunction, Request, Response, query } from "express";
import { checkExact, checkSchema, validationResult } from "express-validator";
import { CreateUserRequest } from "./users.controllers";
import { NotFoundError, queryUser } from "../services/users.service";
import { ReceiverNotFoundError, SenderNotFoundError, TransactionBalanceError, executeTransaction, getTransactionsList } from "../services/transactions.service";

export interface CreateTransactionRequest {
  senderId: string;
  receiverId: string;
  amount: number;
}

export const createTransactionValidation = checkExact(checkSchema({
  senderId: {
    isString: {
      errorMessage: "Invalid format. senderId should be a string",
    },
    notEmpty: {
      errorMessage: "senderId is required",
    }
  },
  receiverId: {
    isString: {
      errorMessage: "Invalid format. receiverId should be a string",
    },
    notEmpty: {
      errorMessage: "receiverId is required",
    }
  },
  amount: {
    isNumeric: {
      errorMessage: "Invalid format. amount should be a number",
    },
    notEmpty: {
      errorMessage: "amountis required",
    }
  },
}))



export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req).array()

  if (result.length > 0) {
    console.log("invalid user body", JSON.stringify(result))
    return res.status(422).json(result);
  }
  console.log("Processing transaction request", JSON.stringify(req.body))

  const request = req.body as CreateTransactionRequest;

  try {
    const transaction = await executeTransaction(request);
    return res.status(200).json(transaction)

  } catch (e) {
    if (e instanceof SenderNotFoundError || e instanceof ReceiverNotFoundError) {
      return res.status(404).send(e.message);
    }

    if (e instanceof TransactionBalanceError) {
      return res.status(422).send("Sender does have sufficient balance")
    }

    console.error("Something went wrong creating a transaction", e);
    return res.status(500).send("Server error")
  }
}

export const listTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transactions = await getTransactionsList();
    return res.status(200).json({ transactions });
  } catch (e) {
    console.error("Something went wrong listing transactions\n", e);
    return res.status(500).send("Server error")
  }
}
