import { BadRequestException } from '../../../exceptions';
import { IUserRepository } from '../domain';
export class DeleteUserUseCaseInput {
  constructor(
    public readonly email: string
  ){}
}

export class DeleteUserUseCaseResponse {
  constructor(
    public readonly message: string
  ){}
}

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    input: DeleteUserUseCaseInput
  ): Promise<DeleteUserUseCaseResponse>{
    const { email } = input;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User is not existed');
    }

    await this.userRepository.delete(email);
    return {
      message: 'Delete User Successfully'
    }
  }
}