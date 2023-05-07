import { CreateUserUseCase, GetUsersUseCase } from "../usecases";
import { userRepository } from "./init-repository";

export const createUserUseCase = new CreateUserUseCase(userRepository);
export const getUsersUseCase = new GetUsersUseCase(userRepository);