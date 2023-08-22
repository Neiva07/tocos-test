import { ObjectId } from "mongodb"
import { dbClient } from "../app"
import { CreateUserRequest } from "../controllers/users.controllers";
import { User } from "../mondels/users";

const USERS_COLLECTION = "users";

interface UserDB extends User {
  _id: ObjectId;
}

export class NotFoundError extends Error { }

export const queryUser = async (id: string): Promise<User> => {
  try {
    const doc = await dbClient.db().collection(USERS_COLLECTION).findOne<UserDB>({
      _id: new ObjectId(id),
    })
    if (doc === null) {
      const message = "Object Not Found"
      throw new NotFoundError(message);
    }
    const user: User = {
      ...doc,
      id: doc._id.toJSON(),
    }
    return user
  } catch (e) {
    const message = "Something went wrong querying the user"
    console.error(e, message);
    throw e;
  }
}

export const insertUser = async (userInfo: CreateUserRequest): Promise<User> => {
  const createdAt = Date.now();
  try {
    const result = await dbClient.db().collection(USERS_COLLECTION).insertOne({
      ...userInfo,
      createdAt,
    });

    const user: User = {
      ...userInfo,
      createdAt,
      id: result.insertedId.toJSON(),
    }

    return user;
  } catch (e) {
    console.error("error creating user", e);
    throw e
  }
}


export const getUserList = async () => {
  const users = [];

  const cursor = dbClient.db().collection(USERS_COLLECTION).find();

  for await (const doc of cursor) {
    const { _id, ...userInfo } = doc as UserDB;

    users.push({
      ...userInfo,
      id: _id.toJSON(),
    })
  }

  return users;
}
