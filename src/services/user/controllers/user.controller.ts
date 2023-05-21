import { Request, Response, NextFunction } from 'express';
import { CreateUserDto, UpdateUserDto } from '../domain';
import {
  CreateUserUseCaseInput,
  GetUserUseCaseInput,
} from '../usecases';
import {
  createUserUseCase,
  deleteUserUseCase,
  getUserUseCase,
  getUsersUseCase,
  updateUserUseCase,
} from '../di';
import { ApiErrorMapper } from '../../../utils';

export const createUser = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const dto = request.body as CreateUserDto;
    const input = new CreateUserUseCaseInput(dto);
    const result = await createUserUseCase.execute(input);
    return response.send({
      message: result.message,
      result: result.result,
    });
  } catch (error: any) {
    return ApiErrorMapper.toErrorResponse(error, response);
  }
};

export const getUsers = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const email = request.query.email as string;
    if (email) {
      const input = new GetUserUseCaseInput(email);
      const result = await getUserUseCase.execute(input);
      return response.send({
        message: result.message,
        user: result.user,
      });
    }
    const result = await getUsersUseCase.execute();
    return response.send({
      users: result.users,
      length: result.length,
    });
  } catch (error: any) {
    return ApiErrorMapper.toErrorResponse(error, response);
  }
};

export const updateUser = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { id } = request.params;
    const dto = request.body as UpdateUserDto;
    const imageData = request.file;
    console.log('imageData', imageData);
    dto.avatarBuffer = imageData?.buffer;
    dto.avatar = imageData?.originalname;
    console.log('dto', dto);
    const result = await updateUserUseCase.execute({
      id,
      dto,
    });

    return response.send({
      message: result.message,
      modifiedUser: result.updateUser,
    });
  } catch (error: any) {
    return ApiErrorMapper.toErrorResponse(error, response);
  }
};

export const deleteUser = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { id } = request.params;
    const result = await deleteUserUseCase.execute({
      id,
    });
    return response.send({
      message: result.message,
    });
  } catch (error: any) {
    return ApiErrorMapper.toErrorResponse(error, response);
  }
};
