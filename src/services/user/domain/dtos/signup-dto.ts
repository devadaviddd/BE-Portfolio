import { Company, School } from "../models";

export interface SignUpDto {
  email: string;
  password: string;
  username: string;
  fullName: string;
  major?: string;
  company?: Company[],
  school?: School[],
  avatar?: string,
}