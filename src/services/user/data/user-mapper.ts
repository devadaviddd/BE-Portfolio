import { DatabaseMapper } from '../../../utils';
import { Company, CompanyProps, School, SchoolProps, User, UserProps } from '../domain';

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

export class UserMongoDBMapper extends DatabaseMapper<
  User,
  UserDataModel
> {
  stringMapToCompanies(strs: string[]): Company[]  {
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

  companyMapToStrings(company: Company[]): string[] {
    const companies: string[] = company.map((each: any) => {
      const { name } = each.props;
      return name;
    })
    return companies;
  } 

  schoolMapToStrings(school: School[]): string[] {
    const schools: string[] = school.map((each: any) => {      
      const { name } = each.props;
      return name;
    })
    return schools;
  } 

  toDomain(dataModel: UserDataModel): User {
    const user = new User({
      id: dataModel._id,
      avatar: dataModel.avatar,
      company: dataModel.company?this.stringMapToCompanies(dataModel.company): undefined,
      email: dataModel.email,
      fullName: dataModel.fullname,
      major: dataModel.major,
      password: dataModel.password,
      school: dataModel.school?this.stringMapToSchools(dataModel.school): undefined,
      username: dataModel.username,
    });
    return user;
  }

  fromDomain(domainModel: User): UserDataModel {
    const user: UserProps = domainModel.accessProps();    
    const data: UserDataModel = {
      _id: user.id,
      avatar: user.avatar,
      company: user.company?this.companyMapToStrings(user.company):undefined,
      email: user.email,
      fullname: user.fullName,
      major: user.major,
      password: user.password,
      school: user.school?this.schoolMapToStrings(user.school):undefined,
      username: user.username
    }
    return data;
  }

}
