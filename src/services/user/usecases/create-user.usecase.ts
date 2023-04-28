import { BadRequestException } from '../../../exceptions';
import { CreateUserDto, Email, IUserRepository, Password, User, UserProps, Username } from '../domain';

export class CreateUserUseCaseInput {
  constructor(public readonly dto: CreateUserDto) {}
}

export class CreateUserUseCaseResponse {
  constructor(
    public readonly message: string,
    public readonly result: UserProps,
  ) {}
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    input: CreateUserUseCaseInput,
  ): Promise<CreateUserUseCaseResponse> {
    const { dto } = input;
    const {
      email,
      username,
      fullName,
      major,
      company,
      school,
      avatar,
      password,
    } = dto;

    if (!email || !username || !fullName || !password) {
      const missingFields: string[] = [];
      if(!email) missingFields.push('email');
      if(!username) missingFields.push('username');
      if(!fullName) missingFields.push('fullName');
      if(!password) missingFields.push('password');
    }

    const isNotValidEmail = !Email.isValid(email);
    if (isNotValidEmail) {
      throw new BadRequestException('Email is not valid');
    }
    const isNotValidUsername = !Username.isValid(username);
    if (isNotValidUsername) {
      throw new BadRequestException('Username is not valid');
    }

    const isNotValidPassword = !Password.isValid(password);
    if(isNotValidPassword) {
      throw new BadRequestException('Password is not valid');
    }
    
    const user = new User({
      email,
      username,
      fullName,
      major,
      company,
      school,
      avatar,
      password,
    });

    await this.userRepository.create(user);
    const message = 'Create user Successfully';
    return {
      message,
      result: user.accessProps()
    }
  }
}
