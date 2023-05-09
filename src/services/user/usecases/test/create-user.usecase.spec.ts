import {
  Company,
  CreateUserDto,
  IUserRepository,
  School,
  User,
} from '../../domain';
import { v4 as uuid } from 'uuid';
import {
  CreateUserUseCase,
  CreateUserUseCaseInput,
  CreateUserUseCaseResponse,
} from '../create-user.usecase';
import { BadRequestException } from '../../../../exceptions';

describe('Create User Unit Test Suite', () => {
  describe('execute', () => {
    /** Mock the compartments */
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

    it('Execute successful and create a new User', async () => {
      /** ARRANGE */
      const id = uuid();
      const dto: CreateUserDto = {
        email: 'khang@gmail.com',
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

      const newUser: User = new User(dto);

      mockUserRepository.findByEmail.mockImplementation(() =>
        Promise.resolve(null),
      );

      /** ACT */
      const input = new CreateUserUseCaseInput(dto);
      const expectResponse = new CreateUserUseCaseResponse(
        'Create user Successfully',
        newUser.accessProps(),
      );
      const usecase = new CreateUserUseCase(mockUserRepository);
      const response = await usecase.execute(input);
      response.result.id = id;

      /** ASSERT */
      expect(response).toEqual(expectResponse);
      expect(usecase.execute(input)).resolves;
    });

    it('Execute throw Email is not valid', async () => {
      /** ARRANGE */
      const id = uuid();
      const dto: CreateUserDto = {
        email: 'khanggmail.com',
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

      /** ACT */
      const input = new CreateUserUseCaseInput(dto);
      const usecase = new CreateUserUseCase(mockUserRepository);

      /** ASSERT */
      expect(usecase.execute(input)).rejects.toThrowError(
        new BadRequestException('Email is not valid'),
      );
      expect(mockUserRepository.findByEmail).not.toBeCalled();
    });

    it('Execute throw Username is not valid', async () => {
      /** ARRANGE */
      const id = uuid();
      const dto: CreateUserDto = {
        email: 'khang@gmail.com',
        username: '12345634123123123123123',
        fullName: 'nguyen tuong khang',
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

      /** ACT */
      const input = new CreateUserUseCaseInput(dto);
      const usecase = new CreateUserUseCase(mockUserRepository);

      /** ASSERT */
      expect(usecase.execute(input)).rejects.toThrowError(
        new BadRequestException('Username is not valid'),
      );
      expect(mockUserRepository.findByEmail).not.toBeCalled();
    });

    it('Execute missing required Fields', async () => {
      /** ARRANGE */
      const id = uuid();
      const dto: CreateUserDto = {
        email: '',
        username: '',
        fullName: '',
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
        password: '',
        id,
      };

      /** ACT */
      const input = new CreateUserUseCaseInput(dto);
      const usecase = new CreateUserUseCase(mockUserRepository);
      /** ASSERT */
      expect(usecase.execute(input)).rejects.toThrowError(
        new BadRequestException(
          'Required Fields: email,username,fullName,password',
        ),
      );
      expect(mockUserRepository.findByEmail).not.toBeCalled();
    });

    it('Execute throw Password is not valid', async () => {
      /** ARRANGE */
      const id = uuid();
      const dto: CreateUserDto = {
        email: 'khang@gmail.com',
        username: 'khangdev',
        fullName: 'nguyen tuong khang',
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
        password: 'Pass',
        id,
      };
      /** ACT */
      const input = new CreateUserUseCaseInput(dto);
      const usecase = new CreateUserUseCase(mockUserRepository);

      /** ASSERT */
      expect(usecase.execute(input)).rejects.toThrowError(
        new BadRequestException('Password is not valid'),
      );
      expect(mockUserRepository.findByEmail).not.toBeCalled();
    });

    it('Execute throw User email already existed', async () => {
      /** ARRANGE */
      const id = uuid();
      const dto: CreateUserDto = {
        email: 'khang@gmail.com',
        username: 'khangdev',
        fullName: 'nguyen tuong khang',
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
      const newUser: User = new User(dto);

      /** ACT */
      const input = new CreateUserUseCaseInput(dto);
      const usecase = new CreateUserUseCase(mockUserRepository);
      mockUserRepository.findByEmail.mockImplementation(() =>
        Promise.resolve(newUser),
      );

      /** ASSERT */
      expect(usecase.execute(input)).rejects.toThrowError(
        new BadRequestException('User is existed'),
      );
      expect(mockUserRepository.findByEmail).toBeCalled();
    });
  });
});
