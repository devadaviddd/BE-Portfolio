/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-fallthrough */
import { S3Bucket } from '../../../data';
import { BadRequestException } from '../../../exceptions';
import {
  isArrayUndefined,
  isStringEmptyOrUndefined,
} from '../../../utils';
import {
  Email,
  IUserRepository,
  UpdateUserDto,
  UserProps,
  Username,
} from '../domain';

export class UpdateUserUseCaseInput {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateUserDto,
  ) {}
}

export class UpdateUserUseCaseResponse {
  constructor(
    public readonly message: string,
    public readonly updateUser: UserProps,
  ) {}
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository,
    private readonly userFileBucket: S3Bucket) {}

  async execute(
    input: UpdateUserUseCaseInput,
  ): Promise<UpdateUserUseCaseResponse> {
    const { id, dto } = input;
    const {
      username,
      email,
      fullName,
      major,
      company,
      school,
      avatar,
      imageData,
      password,
    } = dto;

    const isUnchangedUserName = isStringEmptyOrUndefined(username);
    const isUnchangedEmail = isStringEmptyOrUndefined(email);
    const isUnchangedFullName = isStringEmptyOrUndefined(fullName);
    const isUnchangedMajor = isStringEmptyOrUndefined(major);
    const isUnchangedCompany = isArrayUndefined(company);
    const isUnchangedSchool = isArrayUndefined(school);
    const isUnchangedAvatar = isStringEmptyOrUndefined(avatar);
    const isUnchangedPassword = isStringEmptyOrUndefined(password);

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new BadRequestException('User is not existed');
    }
    if (
      isUnchangedUserName &&
      isUnchangedEmail &&
      isUnchangedFullName &&
      isUnchangedMajor &&
      isUnchangedCompany &&
      isUnchangedSchool &&
      isUnchangedAvatar &&
      isUnchangedPassword
    ) {
      throw new BadRequestException('Nothing to update');
    }
    if (!isUnchangedEmail) {
      const isNotValidEmail = !Email.isValid(email!);
      if (isNotValidEmail) {
        throw new BadRequestException('Email is not valid');
      }
      if (user.email !== email) user.updateEmail(email!);
    }
    if (!isUnchangedUserName) {
      const isNotValidUsername = !Username.isValid(username!);
      if (isNotValidUsername) {
        throw new BadRequestException('Username is not valid');
      }
      if (user.username !== username) user.updateUsername(username!);
    }
    if (!isUnchangedFullName) {
      if (user.fullName !== fullName) user.updateFullName(fullName!);
    }
    if (!isUnchangedSchool) {
      if (user.school !== school) user.updateSchool(school!);
    }
    if (!isUnchangedCompany) {
      if (user.company !== company) user.updateCompany(company!);
    }
    if (!isUnchangedAvatar) {      
      await this.userFileBucket.uploadToBucket(id, imageData!);
      user.avatar = user.id! + '/' + imageData?.originalname
    }
    if (!isUnchangedMajor) {
      if (user.major !== major) user.updateMajor(major!);
    }
    if (!isUnchangedPassword) {
      if (user.password !== password) user.updatePassword(password!);
    }

    await this.userRepository.update(id, user);
    return {
      message: 'Update user successfully',
      updateUser: user.accessProps(),
    };
  }
}
