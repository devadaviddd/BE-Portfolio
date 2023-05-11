import { BadRequestException } from "../../../../exceptions";
import { isStringEmptyOrUndefined } from "../../../../utils";
import { Company } from "./company";
import { School } from "./school";
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import { jwtConfig } from "../../../../config";

export interface UserProps {
  username: string,
  email: string,
  fullName: string,
  major?: string,
  company?: Company[],
  school?: School[],
  avatar?: string,
  password: string,
  id?: string
}

export class User {
  public get password() {
    return this.props.password;
  }

  public get id() {
    return this.props.id;
  }

  public get email() {
    return this.props.email;
  }

  public get username() {
    return this.props.username;
  }

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
  public matchPassword(enteredPassword: string) {
    return this.password === enteredPassword;
  }
  public getSignedAccessToken(): string {
    return jwt.sign(
      {
        id: this.id,
      },
      jwtConfig.secretKeyOfAccessToken,
      {
        expiresIn: jwtConfig.expiresIn,
      },
    );
  }
  public getSignedIdToken(): string {
    return jwt.sign(
      {
        id: this.id,
        email: this.email,
        username: this.username,
      },
      jwtConfig.secretKeyOfIdToken,
      {
        expiresIn: jwtConfig.expiresIn,
      },
    );
  }
  public updateUsername(username: string): void {
    this.props.username = username;
  }
  public updateFullName(fullName: string): void {
    this.props.fullName = fullName;
  }
  public updateEmail(email: string): void {
    this.props.email = email;
  }
  public updatePassword(password: string): void {
    this.props.password = password;
  }
  public updateMajor(major: string): void {
    this.props.major = major;
  }
  public updateCompany(company: Company[]): void {
    this.props.company = company;
  }
  public updateAvatar(avatar: string): void {
    this.props.avatar = avatar;
  }
  public updateSchool(school: School[]): void {
    this.props.school = school;
  }
}