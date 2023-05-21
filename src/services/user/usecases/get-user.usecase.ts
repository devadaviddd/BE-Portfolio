import { BadRequestException } from "../../../exceptions";
import { IUserRepository, UserProps } from "../domain";

export class GetUserUseCaseResponse {
  constructor(
    public readonly message: string,
    public readonly user: UserProps,
  ) {}
}

export class GetUserUseCaseInput {
  constructor(public readonly email: string) {}
}

export class GetUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute (input: GetUserUseCaseInput): Promise<GetUserUseCaseResponse> {
    const { email }  = input;
    const response = await this.userRepository.findByEmail(email);
    if (!response) {
      throw new BadRequestException('User is not existed');
    }
    return {
      message: 'Get user successfully',
      user: response.accessProps()
    }
  }
}