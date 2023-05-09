import { BadRequestException } from "../../../exceptions";
import { Email, IUserRepository, Password, SignUpDto, User, Username } from "../domain";

export class SignUpUseCaseInput {
  constructor(public readonly dto: SignUpDto) {}
}
export class SignUpUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: SignUpUseCaseInput): Promise<string> {
    const { dto } = input;
    const {
      email,
      password,
      username,
      fullName,
      major,
      company,
      school,
      avatar
    } = dto;

    if (
      !email ||
      !password ||
      !username || 
      !fullName
    ) {
      const missingFields: string[] = [];
      if (!email) missingFields.push('email');
      if (!password) missingFields.push('password');
      if (!fullName) missingFields.push('fullName');
      if (!username) missingFields.push('username');

      const errorStr = 'Required Fields: ' + missingFields.join(', ');
      throw new BadRequestException(errorStr);
    }

    const isNotValidEmail = !Email.isValid(email);
    if (isNotValidEmail) {
      throw new BadRequestException('Email is not valid');
    }

    const isNotValidPassword = !Password.isValid(password);
    if (isNotValidPassword) {
      throw new BadRequestException('Password is not valid');
    }

    const isNotValidUsername = !Username.isValid(username);
    if (isNotValidUsername) {
      throw new BadRequestException('Username is not valid');
    }

    const existedUser = await this.userRepository.findByEmail(email);
    if (existedUser) {
      throw new BadRequestException('User is existed');
    }
    const user = new User({
      email,
      password,
      username,
      major,
      fullName,
      company,
      school,
      avatar
    });
    await this.userRepository.create(user);
    return 'Signup successfully';
  }
}
