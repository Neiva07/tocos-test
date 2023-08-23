const HOST_URL = "http://localhost:6868"

export interface User {
  id: string;
  name: string;
  email: string;
  tocos: number;
  createdAt: number;
  updatedAt?: number;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  tocos: number;
}

export interface ExecuteTransactionPayload {
  senderId: string;
  receiverId: string;
  amount: number;
}

export interface Transaction {
  id: string;
  sender: User;
  receiver: User;
  datetime: number;
  amount: number;
}


export const getUsers = async (): Promise<Array<User>> => {
  const response = await fetch(HOST_URL + "/api/v1/users", {
    method: "GET"
  })

  if (!response.ok) {
    throw response.statusText;
  }
  const { users } = await response.json();
  return users
}

export const createUser = async (payload: CreateUserPayload): Promise<User> => {
  const response = await fetch(HOST_URL + "/api/v1/users", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw response.statusText;
  }

  const { user } = await response.json();
  return user
}

export const getTransactions = async (): Promise<Array<Transaction>> => {
  const response = await fetch(HOST_URL + "/api/v1/transactions", {
    method: "GET"
  })
  const { transactions } = await response.json();

  if (!response.ok) {
    throw response.statusText;
  }
  return transactions
}

export const executeTransaction = async (payload: ExecuteTransactionPayload): Promise<Transaction> => {
  const response = await fetch(HOST_URL + "/api/v1/transactions", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const { transaction } = await response.json();

  if (!response.ok) {
    throw response.statusText;
  }
  return transaction
}
