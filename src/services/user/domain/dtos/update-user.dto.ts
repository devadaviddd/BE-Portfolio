import { Company, School } from "../models";

export interface UpdateUserDto {
  username?: string,
  email?: string,
  fullName?: string,
  major?: string,
  company?: Company[],
  school?: School[],
  avatar?: string,
  imageData?: Express.Multer.File,
  password?: string,
}