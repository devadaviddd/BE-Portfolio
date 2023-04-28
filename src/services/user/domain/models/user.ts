import { BadRequestException } from "../../../../exceptions";
import { isStringEmptyOrUndefined } from "../../../../utils";
import { Company } from "./company";
import { School } from "./school";
import { v4 as uuid } from 'uuid';

export interface UserProps {
  username: string,
  email: string,
  fullName: string,
  major?: string,
  company?: Company[],
  school?: School[],
  avatar: string,
  password: string,
  id?: string
}

export class User {
  constructor(private readonly props: UserProps) {
    if (!props) {
      throw new BadRequestException('Props of user is null/undefined');
    }
    const {
      username,
      email,
      fullName,
      major,
      company,
      school,
      avatar,
      password,
      id
    } = props;

    if(isStringEmptyOrUndefined(username)) {
      throw new BadRequestException('Email is null/undefined');
    }
    if (isStringEmptyOrUndefined(password)) {
      throw new BadRequestException('Password is null/undefined');
    }
    if (isStringEmptyOrUndefined(username)) {
      throw new BadRequestException('Username is null/undefined');
    }
    if (isStringEmptyOrUndefined(fullName)) {
      throw new BadRequestException('FullName is null/undefined');
    }
    if (isStringEmptyOrUndefined(email)) {
      throw new BadRequestException('Email is null/undefined');
    }
    if (!id) {
      this.props.id = uuid();
    }
  }

  public accessProps(): UserProps {
    const {
      username,
      email,
      fullName,
      major,
      company,
      school,
      avatar,
      password,
      id
    } = this.props;
    return {
      username,
      email,
      fullName,
      major,
      company,
      school,
      avatar,
      password,
      id
    }
  }
}