import { GridFSBucketReadStream, GridFSFile } from "mongodb";
import { User } from "../models";

export interface ViewUserResponse {
  result: User[];
  length: number;
}

export interface FileResponse {
  status: | 'success' | 'error';
  fileName: string;
  message?: string;
}

export type ImageType = {
  stream: GridFSBucketReadStream,
  mimetype: string,
}

export interface GetUserResponse {
  user: User;
  imageData: GridFSFile
}

export interface IUserRepository {
  create(newUser: User): Promise<void>;
  update(_id: string, newUser: User): Promise<void>;
  findByEmail(email: string): Promise<GetUserResponse | null>;
  delete(id: string): Promise<void>;
  viewUsers(): Promise<ViewUserResponse>;
  findById(id: string): Promise<User | null>;
  uploadAvatar(id: string, imageData: Express.Multer.File): void;
}