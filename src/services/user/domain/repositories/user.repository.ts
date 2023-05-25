import { User } from "../models";

export interface ViewUsersResponse {
  result: ViewUserResponse[];
  length: number;
}

export interface FileResponse {
  status: | 'success' | 'error';
  fileName: string;
  message?: string;
}

export type ViewUserResponse = {
  user: User;
  base64Image?: string;
}

export interface IUserRepository {
  create(newUser: User): Promise<void>;
  update(_id: string, newUser: User): Promise<void>;
  findByEmail(email: string): Promise<ViewUserResponse | null>;
  delete(id: string): Promise<void>;
  viewUsers(): Promise<ViewUsersResponse>;
  findById(id: string): Promise<User | null>;
}