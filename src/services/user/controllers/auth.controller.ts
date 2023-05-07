import { jwtConfig } from "../../../config";
import { ApiErrorMapper } from "../../../utils";
import { signinUseCase, signupUseCase } from "../di";
import { SignUpDto, SigninDto } from "../domain";
import { SignUpUseCaseInput, SigninUseCaseInput, SigninUseCaseResponse } from "../usecases";
import { Request, Response, NextFunction } from 'express';


export const signin = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const dto = request.body as SigninDto;
    const input = new SigninUseCaseInput(dto);
    const result = await signinUseCase.execute(input);
    return next(sendTokensAndSignInResponse(response, result));
  } catch (error: any) {
    return ApiErrorMapper.toErrorResponse(error, response);
  }
};

export const signup = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const dto = request.body as SignUpDto;
    const input = new SignUpUseCaseInput(dto);
    const message = await signupUseCase.execute(input);
    return response.send({
      message
    })
  } catch (error: any) {
    return ApiErrorMapper.toErrorResponse(error, response);
  }
}

const sendTokensAndSignInResponse = (
  response: Response,
  tokens: SigninUseCaseResponse,
) => {
  const MS_IN_A_DAY = 24 * 60 * 60 * 1000;
  const options = {
    expires: new Date(
      Date.now() + Number.parseInt(jwtConfig.expiresIn) * MS_IN_A_DAY,
    ),
    httpOnly: true,
  };

  return response
    .status(200)
    .cookie('accessToken', tokens.accessToken, options)
    .cookie('idToken', tokens.idToken, options)
    .json({
      ...tokens,
    });
};