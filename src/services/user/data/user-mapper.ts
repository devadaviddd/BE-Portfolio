import { Binary, ObjectId } from 'mongodb';
import { DatabaseMapper } from '../../../utils';
import {
  Company,
  CompanyProps,
  School,
  SchoolProps,
  User,
  UserProps,
} from '../domain';

export interface UserDataModel {
  _id: string | undefined;
  avatar?: string;
  company: string[] | undefined;
  email: string;
  fullname: string;
  major: string | undefined;
  password: string;
  school: string[] | undefined;
  username: string;
}

export interface AvatarChunkModel {
  _id: ObjectId;
  files_id: string;
  data: Binary;
  n: number;
}

export class UserMongoDBMapper extends DatabaseMapper<
  User,
  UserDataModel
> {
  stringMapToCompanies(strs: string[]): Company[] {
    const companies: Company[] = strs.map(
      (element) => new Company({ name: element }),
    );
    return companies;
  }

  stringMapToSchools(strs: string[]): School[] {
    const schools: School[] = strs.map(
      (element) => new School({ name: element }),
    );
    return schools;
  }

  companyMapToStrings(companies: Company[]): string[] {
    const companiesModel: string[] = [];
    companies.map((company: Company) => {
      companiesModel.push(company.name);
    });
    return companiesModel;
  }

  schoolMapToStrings(schools: School[]): string[] {
    const schoolsModel: string[] = [];
    schools.map((school) => {
      schoolsModel.push(school.name);
    });
    return schoolsModel;
  }

  toDomain(dataModel: UserDataModel): User {
    const user = new User({
      id: dataModel._id,
      avatar: dataModel.avatar,
      company: dataModel.company
        ? this.stringMapToCompanies(dataModel.company)
        : undefined,
      email: dataModel.email,
      fullName: dataModel.fullname,
      major: dataModel.major,
      password: dataModel.password,
      school: dataModel.school
        ? this.stringMapToSchools(dataModel.school)
        : undefined,
      username: dataModel.username,
    });
    return user;
  }

  fromDomain(domainModel: User): UserDataModel {
    const user: UserProps = domainModel.accessProps();
    const data: UserDataModel = {
      _id: user.id,
      avatar: user.avatar,
      company: user.company
        ? this.companyMapToStrings(user.company)
        : undefined,
      email: user.email,
      fullname: user.fullName,
      major: user.major,
      password: user.password,
      school: user.school
        ? this.schoolMapToStrings(user.school)
        : undefined,
      username: user.username,
    };
    return data;
  }
}
