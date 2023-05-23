import { userResponseFormat } from '../../../utils';
import { IUserRepository, User, UserProps, ViewUserResponse, } from '../domain';

export class GetUsersUseCaseResponse {
  constructor(
    public readonly users: ViewUserResponse[],
    public readonly length: number
  ) {}
}

export class GetUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<GetUsersUseCaseResponse> {
    const response = await this.userRepository.viewUsers();  
    const { result, length } = response;    
    return {
      users: result,
      length
    }
  }
}     