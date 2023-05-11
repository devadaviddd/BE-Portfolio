import { User } from "../models";

export interface ViewUserResponse {
  result: User[];
  length: number;
}


export interface IUserRepository {
  create(newUser: User): Promise<void>;
  update(_id: string, newUser: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  delete(id: string): Promise<void>;
  viewUsers(): Promise<ViewUserResponse>;
  findById(id: string): Promise<User | null>;
}