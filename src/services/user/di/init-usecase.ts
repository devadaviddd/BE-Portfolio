import { CreateUserUseCase } from "../usecases";
import { userRepository } from "./init-repository";

export const createUserUseCase = new CreateUserUseCase(userRepository);
