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
  metaData,
  updateUserUseCase,
} from '../di';
import { ApiErrorMapper } from '../../../utils';
import { GridFSBucketReadStream } from 'mongodb';
import { resolve } from 'path';

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

      console.log('metadata', result.imageData.metadata);

      // const chunks: Buffer[] = [];
      const base64Image = await metaData.getImageAsBase64(
        result.imageData.filename,
      );
      // metaData.bucket
      //   .openDownloadStreamByName(result.imageData.filename)
      //   .on('error', (error) => {
      //     console.log('error', error);
      //   })
      //   .on('data', (chunk) => {
      //     console.log('chunk', chunk);
      //     chunks.push(chunk);
      //   })
      //   .on('end', () => {
      //     const imageBuffer = Buffer.concat(chunks);
      //     base64Image = imageBuffer.toString('base64');
      //     resolve(base64Image)
      //     // console.log('Base64-encoded image:', base64Image);
      //   })

      console.log('base64Image', base64Image);

      return response.send({
        message: result.message,
        user: result.user,
        imag: base64Image,
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
    dto.avatar = imageData?.originalname;
    dto.imageData = imageData;
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
