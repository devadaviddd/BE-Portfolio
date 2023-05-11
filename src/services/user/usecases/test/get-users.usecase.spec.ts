import {
  Company,
  IUserRepository,
  School,
  User,
  UserProps,
} from '../../domain';
import { v4 as uuid } from 'uuid';
import {
  GetUserUseCaseResponse,
  GetUsersUseCase,
} from '../get-users.usecase';

describe('Get Users Unit Test Suite', () => {
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
    const id1 = uuid();
    const id2 = uuid();
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('Case 1: Execute successful and return users', async () => {
      /** ARRANGE */
      const usersProps: UserProps[] = [
        {
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
          id: id1,
        },
        {
          email: 'khang2@gmail.com',
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
          id: id2,
        },
      ];
      const users: User[] = [
        new User(usersProps[0]),
        new User(usersProps[1]),
      ];
      mockUserRepository.viewUsers.mockImplementationOnce(() =>
        Promise.resolve({
          result: users,
          length: users.length,
        }),
      );
      const expectResponse = new GetUserUseCaseResponse(
        usersProps,
        usersProps.length,
      );

      /** ACT */
      const usecase = new GetUsersUseCase(mockUserRepository);
      const response = await usecase.execute();

      /** ASSERT */
      expect(response).toEqual(expectResponse);
    });
  });
});
