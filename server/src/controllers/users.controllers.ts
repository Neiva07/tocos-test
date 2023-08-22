import { NextFunction, Request, Response } from "express";
import { NotFoundError, getUserList, insertUser, queryUser } from "../services/users.service";
import { User } from "../mondels/users";
import { checkExact, checkSchema, param, validationResult } from "express-validator";

export interface CreateUserRequest {
  name: string;
  tocos: number;
  email: string;
}

interface CreateUserResponse {
  user: User;
}

interface GetUserResponse {
  user: User;
}

export const getUserValidation = checkExact(param("id").isString().notEmpty())

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req).array()

  if (result.length > 0) {
    console.log("invalid user body", JSON.stringify(result))
    return res.status(422).json(result);
  }

  const id = req.params["id"]

  try {
    const user = await queryUser(id);
    const userResponse: GetUserResponse = {
      user,
    }
    return res.status(200).json(userResponse)
  } catch (e) {
    if (e instanceof NotFoundError) {
      return res.status(204).send("User not found");
    }
    console.error("Something went wrong querying the data");
    return res.status(500).send("Server error");
  }
};

export const createUserValidation = checkExact(checkSchema({
  email: {
    isEmail: {
      errorMessage: "Invalid email format",
    },
    notEmpty: {
      errorMessage: "email is a required field",
    },
  },
  name: {
    isString: {
      errorMessage: "Invalid name format. It should be a string",
    },
    notEmpty: {
      errorMessage: "name is a required field",
    },
  },
  tocos: {
    isNumeric: {
      errorMessage: "Invalid tocos format. It should be a number",
    },
    notEmpty: {
      errorMessage: "tocos is a required field",
    },
  }
}))

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req).array()

  if (result.length > 0) {
    console.log("invalid user body", JSON.stringify(result))
    return res.status(422).json(result);
  }

  const userRequest = req.body as CreateUserRequest;


  try {
    const user = await insertUser(userRequest)
    const userResponse: CreateUserResponse = {
      user
    }

    return res.status(200).json(userResponse);

  } catch (e) {
    console.error("Error creating user", e)
    return res.status(500).send("Server error")
  }
};

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getUserList();

    return res.status(200).json({ users });
  } catch (e) {
    console.error("Something went wrong listing users", e);
    return res.status(500).send("Server error");
  }
}
