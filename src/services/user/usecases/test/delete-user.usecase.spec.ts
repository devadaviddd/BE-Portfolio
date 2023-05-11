import {
  Company,
  CreateUserDto,
  IUserRepository,
  School,
  User,
} from '../../domain';
import { v4 as uuid } from 'uuid';
import {
  DeleteUserUseCase,
  DeleteUserUseCaseInput,
  DeleteUserUseCaseResponse,
} from '../delete-user.usecase';
import { BadRequestException } from '../../../../exceptions';

describe('Delete User Use Case Test Suite', () => {
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
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('Execute successful and delete a User', async () => {
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

      const user: User = new User(dto);
      mockUserRepository.findByEmail.mockImplementationOnce(() =>
        Promise.resolve(user),
      );

      const expectedResponse = new DeleteUserUseCaseResponse(
        'Delete User Successfully',
      );
      const input = new DeleteUserUseCaseInput(id);
      const usecase = new DeleteUserUseCase(mockUserRepository);
      const response = await usecase.execute(input);

      expect(response).toEqual(expectedResponse);
      expect(mockUserRepository.findByEmail).toBeCalled();
    });

    it('Should throw Error when User not found', async () => {
      const id = uuid();
      mockUserRepository.findByEmail.mockImplementationOnce(() =>
        Promise.resolve(null),
      );
      const input = new DeleteUserUseCaseInput(id);
      const usecase = new DeleteUserUseCase(mockUserRepository);
      expect(usecase.execute(input)).rejects.toThrowError(new BadRequestException(
        'User is not existed'
      ));
      expect(mockUserRepository.findByEmail).toBeCalled();
    
    });
  });
});
