import { Company, School } from "../models";

export interface CreateUserDto {
  email: string,
  username: string,
  fullName: string,
  major?: string,
  company?: Company[],
  school?: School[],
  avatar: string,
  password: string,  
}