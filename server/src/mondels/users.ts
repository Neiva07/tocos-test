export interface User {
  name: string;
  id: string;
  email: string;
  tocos: number;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
}
