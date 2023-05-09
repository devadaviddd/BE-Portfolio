import {
  Company,
  IUserRepository,
  School,
  SignUpDto,
  User,
  UserProps,
} from '../../domain';
import { v4 as uuid } from 'uuid';
import {
  SigninUseCase,
  SigninUseCaseInput,
  SigninUseCaseResponse,
} from '../signin.usecase';
import { BadRequestException } from '../../../../exceptions';

describe('Signin Auth Test Suite', () => {
  describe('execute', () => {
    /** Mock the compartments */
    type DTO = {
      email: string | undefined;
      password: string | undefined;
    };
    const id = uuid();
    const userProps: UserProps = {
      email: 'khangdev@gmail.com',
      username: 'Devadavid',
      fullName: 'Nguyen Tuong Khang',
      major: 'Software Engineer',
      company: [
        new Company({
          name: 'Zoi',
        }),
      ],
      school: [
        new School({
          name: 'RMIT',
        }),
      ],
      avatar: 'khang.png',
      password: 'Password2*',
      id,
    };
    const user = new User(userProps);

    const mockUserRepository: jest.Mocked<IUserRepository> = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      viewUsers: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('Execute successfully and return token', async () => {
      /** ARRANGE */
      const dto: DTO = {
        email: 'khangdev@gmail.com',
        password: 'Password2*',
      };

      mockUserRepository.findByEmail.mockImplementationOnce(() =>
        Promise.resolve(user),
      );
      jest
        .spyOn(user, 'matchPassword')
        .mockImplementationOnce(() => true);
      jest
        .spyOn(user, 'getSignedAccessToken')
        .mockImplementationOnce(() => 'accessToken');
      jest
        .spyOn(user, 'getSignedIdToken')
        .mockImplementationOnce(() => 'idToken');
      const expectResponse = new SigninUseCaseResponse(
        'accessToken',
        'idToken',
      );

      /** ACT */
      const input = new SigninUseCaseInput(dto as SignUpDto);
      const usecase = new SigninUseCase(mockUserRepository);
      const response = await usecase.execute(input);

      /** ASSERTION */
      expect(response).toEqual(expectResponse);
    });

    it('Missing required Field', async () => {
      /** ARRANGE */
      const dto: DTO = {
        email: undefined,
        password: undefined,
      };

      /** ACT */
      const input = new SigninUseCaseInput(dto as SignUpDto);
      const usecase = new SigninUseCase(mockUserRepository);

      /** ASSERTION */
      expect(usecase.execute(input)).rejects.toThrowError(
        new BadRequestException('Missing email, password'),
      );
      expect(mockUserRepository.findByEmail).not.toBeCalled();
    });
    it('Email is not exist', () => {
      /** ARRANGE */
      const dto: DTO = {
        email: 'khangdev@gmail.com',
        password: 'Password2*',
      };
      mockUserRepository.findByEmail.mockImplementationOnce(() =>
        Promise.resolve(null),
      );

      /** ACT */
      const input = new SigninUseCaseInput(dto as SignUpDto);
      const usecase = new SigninUseCase(mockUserRepository);

      /** ASSERTION */
      expect(usecase.execute(input)).rejects.toThrowError(
        new BadRequestException('User is not existed'),
      );
      expect(mockUserRepository.findByEmail).toBeCalled();
      expect(jest.spyOn(user, 'matchPassword')).not.toBeCalled();
      expect(
        jest.spyOn(user, 'getSignedAccessToken'),
      ).not.toBeCalled();
      expect(jest.spyOn(user, 'getSignedIdToken')).not.toBeCalled();
    });
    it('Password is incorrect', () => {
      /** ARRANGE */
      const dto: DTO = {
        email: 'khangdev@gmail.com',
        password: 'Password2*',
      };
      mockUserRepository.findByEmail.mockImplementationOnce(() =>
        Promise.resolve(user),
      );
      jest
        .spyOn(user, 'matchPassword')
        .mockImplementationOnce(() => false);

      /** ACT */
      const input = new SigninUseCaseInput(dto as SignUpDto);
      const usecase = new SigninUseCase(mockUserRepository);

      /** ASSERTION */
      expect(usecase.execute(input)).rejects.toThrowError(
        new BadRequestException('Password is incorrect'),
      );
      expect(
        jest.spyOn(user, 'getSignedAccessToken'),
      ).not.toBeCalled();
      expect(jest.spyOn(user, 'getSignedIdToken')).not.toBeCalled();
      expect(mockUserRepository.findByEmail).toBeCalled();
    });
  });
});
