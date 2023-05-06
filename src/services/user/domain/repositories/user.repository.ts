import { User } from "../models";

export interface ViewUserResponse {
  result: User[];
  length: number;
}


export interface IUserRepository {
  create(newUser: User): Promise<void>;
  update(email: string, newUser: User): Promise<void>;
  findByEmail(email: string): Promise<boolean>;
  delete(email: string, version?: number): Promise<void>;
  viewUsers(): Promise<ViewUserResponse>;
}