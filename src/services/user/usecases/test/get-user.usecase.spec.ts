import { v4 as uuid } from 'uuid';
import {
  Company,
  IUserRepository,
  School,
  User,
  UserProps,
} from '../../domain';
import {
  GetUserUseCase,
  GetUserUseCaseInput,
  GetUserUseCaseResponse,
} from '../get-user.usecase';
import { BadRequestException } from '../../../../exceptions';
describe('Get User Unit Test Suite', () => {
  describe('execute', () => {
    /** Mock the compartments */
    const mockUserRepository: jest.Mocked<IUserRepository> = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      viewUsers: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
    };
    const id = uuid();
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('Case 1: Execute successful and return user', async () => {
      const userProps: UserProps = {
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
        id: uuid(),
      };
      mockUserRepository.findByEmail.mockImplementationOnce(() =>
        Promise.resolve(new User(userProps)),
      );
      const expectResponse = new GetUserUseCaseResponse(
        'Get user successfully',
        userProps,
      );
      const usecase = new GetUserUseCase(mockUserRepository);
      const input = new GetUserUseCaseInput(userProps.email);
      const response = await usecase.execute(input);

      expect(response).toEqual(expectResponse);
    });

    it('Case 2: User is not existed', async () => {
      mockUserRepository.findByEmail.mockImplementationOnce(() =>
        Promise.resolve(null),
      );
      const usecase = new GetUserUseCase(mockUserRepository);
      const input = new GetUserUseCaseInput('test@gmail.com');
      await expect(usecase.execute(input)).rejects.toThrowError(
        new BadRequestException('User is not existed')
      );
    });
  });
});
