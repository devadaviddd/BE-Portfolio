import {
  BadRequestException,
  NotFoundException,
  UnAuthorized,
} from '../../../exceptions';
import { IUserRepository, SigninDto } from '../domain';

export class SigninUseCaseInput {
  constructor(public readonly dto: SigninDto) {}
}

export class SigninUseCaseResponse {
  constructor(
    public readonly accessToken: string,
    public readonly idToken: string,
  ) {}
}
export class SigninUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    input: SigninUseCaseInput,
  ): Promise<SigninUseCaseResponse> {
    const { dto } = input;
    const { email, password } = dto;

    console.log('email', email);
    console.log('password', password);
    
    if (!email || !password) {
      const missingFields: string[] = [];
      if (!email) missingFields.push('email');
      if (!password) missingFields.push('password');
      const errorStr = 'Missing ' + missingFields.join(', ');
      throw new BadRequestException(errorStr);
    }

    const existedUser = await this.userRepository.findByEmail(email);
    if (!existedUser) {
      throw new NotFoundException('User is not existed');
    }

    const isPasswordNotMatched = !existedUser.matchPassword(password);
    if (isPasswordNotMatched)
      throw new BadRequestException('Password is incorrect');

    const accessToken = existedUser.getSignedAccessToken();
    const idToken = existedUser.getSignedIdToken();
    return {
      accessToken,
      idToken,
    };
  }
}
