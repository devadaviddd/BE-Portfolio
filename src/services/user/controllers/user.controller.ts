import { Request, Response, NextFunction } from "express";
import { CreateUserDto } from "../domain";
import { CreateUserUseCaseInput } from "../usecases";
import { createUserUseCase } from "../di";
import { ApiErrorMapper } from "../../../utils";

export const createUser = async (
  request: Request,
  response: Response,
  next: NextFunction
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
}