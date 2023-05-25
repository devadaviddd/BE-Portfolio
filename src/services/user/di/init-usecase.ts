import {
  CreateUserUseCase,
  GetUserUseCase,
  GetUsersUseCase,
  SignUpUseCase,
  SigninUseCase,
  UpdateUserUseCase,
} from '../usecases';
import { DeleteUserUseCase } from '../usecases/delete-user.usecase';
import { userFileBucket, userRepository } from './init-repository';

export const signinUseCase = new SigninUseCase(userRepository);
export const signupUseCase = new SignUpUseCase(userRepository);
export const createUserUseCase = new CreateUserUseCase(
  userRepository,
);
export const getUsersUseCase = new GetUsersUseCase(userRepository);
export const updateUserUseCase = new UpdateUserUseCase(userRepository, userFileBucket);
export const deleteUserUseCase = new DeleteUserUseCase(userRepository);
export const getUserUseCase = new GetUserUseCase(userRepository);