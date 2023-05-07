import {
  CreateUserUseCase,
  GetUsersUseCase,
  SignUpUseCase,
  SigninUseCase,
} from '../usecases';
import { userRepository } from './init-repository';

export const signinUseCase = new SigninUseCase(userRepository);
export const signupUseCase = new SignUpUseCase(userRepository);
export const createUserUseCase = new CreateUserUseCase(
  userRepository,
);
export const getUsersUseCase = new GetUsersUseCase(userRepository);
