import { BadRequestException } from '../../../../exceptions';
import { isStringEmptyOrUndefined } from '../../../../utils';
import { Company } from './company';
import { School } from './school';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../../config';

export interface UserProps {
  username: string;
  email: string;
  fullName: string;
  major?: string;
  company?: Company[];
  school?: School[];
  avatar?: string;
  password: string;
  id?: string;
}

export class User {
  public username: string;
  public email: string;
  public fullName: string;
  public major?: string;
  public company?: Company[];
  public school?: School[];
  public avatar?: string;
  public password: string;
  public id?: string;

  constructor(props: UserProps) {
    if (!props) {
      throw new BadRequestException(
        'Props of user is null/undefined',
      );
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
      id,
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
    this.username = username;
    this.email = email;
    this.fullName = fullName;
    this.major = major;
    this.company = company;
    this.school = school;
    this.avatar = avatar;
    this.password = password;
    this.id = id;

    if (!id) {
      this.id = uuid();
    }
  }

  public accessProps(): UserProps {
    return {
      username: this.username,
      email: this.email,
      fullName: this.fullName,
      major: this.major,
      company: this.company,
      school: this.school,
      avatar: this.avatar,
      password: this.password,
      id: this.id,
    };
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
    this.username = username;
  }
  public updateFullName(fullName: string): void {
    this.fullName = fullName;
  }
  public updateEmail(email: string): void {
    this.email = email;
  }
  public updatePassword(password: string): void {
    this.password = password;
  }
  public updateMajor(major: string): void {
    this.major = major;
  }
  public updateCompany(company: Company[]): void {
    this.company = company;
  }
  public updateAvatar(avatar: string): void {
    this.avatar = avatar;
  }
  public updateSchool(school: School[]): void {
    this.school = school;
  }
}
