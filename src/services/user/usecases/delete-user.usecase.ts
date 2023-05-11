import { BadRequestException } from '../../../exceptions';
import { IUserRepository } from '../domain';
export class DeleteUserUseCaseInput {
  constructor(
    public readonly id: string
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
    const { id } = input;
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new BadRequestException('User is not existed');
    }

    await this.userRepository.delete(id);
    return {
      message: 'Delete User Successfully'
    }
  }
}