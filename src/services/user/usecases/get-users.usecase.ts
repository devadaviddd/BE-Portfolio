import { userResponseFormat } from '../../../utils';
import { IUserRepository, UserProps } from '../domain';

export class GetUserUseCaseResponse {
  constructor(
    public readonly users: UserProps[],
    public readonly length: number
  ) {}
}

export class GetUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<GetUserUseCaseResponse> {
    const response = await this.userRepository.viewUsers();  
    const { result: users, length } = response;    
    return {
      users: userResponseFormat(users),
      length
    }
  }
}     