import {
  Company,
  CreateUserDto,
  IUserRepository,
  School,
  UpdateUserDto,
  User,
} from '../../domain';
import { v4 as uuid } from 'uuid';
import {
  UpdateUserUseCase,
  UpdateUserUseCaseInput,
  UpdateUserUseCaseResponse,
} from '../update-user.usecase';
import { BadRequestException } from '../../../../exceptions';

describe('Update User Test Suite', () => {
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

    const id = uuid();
    const createDto: CreateUserDto = {
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

    it('Update User Successfully', async () => {
      const dto: UpdateUserDto = {
        username: 'updateUsername',
        email: 'new@gmail.com',
        fullName: 'updateFullName',
        major: 'updateMajor',
        company: [
          new Company({
            name: 'Company 1',
          }),
        ],
        school: [
          new School({
            name: 'School 1',
          }),
        ],
        avatar: 'updateAvatar',
        password: 'Password3*',
      };
      const expectedUser: User = new User({
        username: 'updateUsername',
        email: 'new@gmail.com',
        fullName: 'updateFullName',
        major: 'updateMajor',
        company: [
          new Company({
            name: 'Company 1',
          }),
        ],
        school: [
          new School({
            name: 'School 1',
          }),
        ],
        avatar: 'updateAvatar',
        password: 'Password3*',
        id,
      });
      const existedUser: User = new User(createDto);
      mockUserRepository.findById.mockImplementationOnce(() =>
        Promise.resolve(existedUser),
      );
      const updateEmailSpy = jest.spyOn(existedUser, 'updateEmail');
      const updateUsernameSpy = jest.spyOn(
        existedUser,
        'updateUsername',
      );
      const updateFullNameSpy = jest.spyOn(
        existedUser,
        'updateFullName',
      );
      const updateSchoolSpy = jest.spyOn(existedUser, 'updateSchool');
      const updateCompanySpy = jest.spyOn(
        existedUser,
        'updateCompany',
      );
      const updateAvatarSpy = jest.spyOn(existedUser, 'updateAvatar');
      const updateMajorSpy = jest.spyOn(existedUser, 'updateMajor');
      const updatePasswordSpy = jest.spyOn(
        existedUser,
        'updatePassword',
      );

      const input = new UpdateUserUseCaseInput(id, dto);
      const usecase = new UpdateUserUseCase(mockUserRepository);
      const expectedResponse = new UpdateUserUseCaseResponse(
        'Update user successfully',
        expectedUser.accessProps(),
      );
      const response = await usecase.execute(input);

      expect(response).toEqual(expectedResponse);
      expect(mockUserRepository.update).toBeCalled();
      expect(updateEmailSpy).toBeCalled();
      expect(updateUsernameSpy).toBeCalled();
      expect(updateFullNameSpy).toBeCalled();
      expect(updateSchoolSpy).toBeCalled();
      expect(updateCompanySpy).toBeCalled();
      expect(updateAvatarSpy).toBeCalled();
      expect(updateMajorSpy).toBeCalled();
      expect(updatePasswordSpy).toBeCalled();
    });

    it('User nothing to update', async () => {
      const dto: UpdateUserDto = {};
      const existedUser: User = new User(createDto);
      mockUserRepository.findById.mockImplementationOnce(() =>
        Promise.resolve(existedUser),
      );
      const updateEmailSpy = jest.spyOn(existedUser, 'updateEmail');
      const updateUsernameSpy = jest.spyOn(
        existedUser,
        'updateUsername',
      );
      const updateFullNameSpy = jest.spyOn(
        existedUser,
        'updateFullName',
      );
      const updateSchoolSpy = jest.spyOn(existedUser, 'updateSchool');
      const updateCompanySpy = jest.spyOn(
        existedUser,
        'updateCompany',
      );
      const updateAvatarSpy = jest.spyOn(existedUser, 'updateAvatar');
      const updateMajorSpy = jest.spyOn(existedUser, 'updateMajor');
      const updatePasswordSpy = jest.spyOn(
        existedUser,
        'updatePassword',
      );

      const input = new UpdateUserUseCaseInput(id, dto);
      const usecase = new UpdateUserUseCase(mockUserRepository);
      expect(usecase.execute(input)).rejects.toThrowError(
        new BadRequestException('Nothing to update'),
      );
      expect(mockUserRepository.findById).toBeCalled();
      expect(updateEmailSpy).not.toBeCalled();
      expect(updateUsernameSpy).not.toBeCalled();
      expect(updateFullNameSpy).not.toBeCalled();
      expect(updateSchoolSpy).not.toBeCalled();
      expect(updateCompanySpy).not.toBeCalled();
      expect(updateAvatarSpy).not.toBeCalled();
      expect(updateMajorSpy).not.toBeCalled();
      expect(updatePasswordSpy).not.toBeCalled();
      expect(mockUserRepository.update).not.toBeCalled();
    });

    it('When the User is not existed with id provided', async () => {
      const dto: UpdateUserDto = {};
      mockUserRepository.findById.mockImplementationOnce(() =>
        Promise.resolve(null),
      );
      const existedUser: User = new User(createDto);
      const updateEmailSpy = jest.spyOn(existedUser, 'updateEmail');
      const updateUsernameSpy = jest.spyOn(
        existedUser,
        'updateUsername',
      );
      const updateFullNameSpy = jest.spyOn(
        existedUser,
        'updateFullName',
      );
      const updateSchoolSpy = jest.spyOn(existedUser, 'updateSchool');
      const updateCompanySpy = jest.spyOn(
        existedUser,
        'updateCompany',
      );
      const updateAvatarSpy = jest.spyOn(existedUser, 'updateAvatar');
      const updateMajorSpy = jest.spyOn(existedUser, 'updateMajor');
      const updatePasswordSpy = jest.spyOn(
        existedUser,
        'updatePassword',
      );

      const input = new UpdateUserUseCaseInput(id, dto);
      const usecase = new UpdateUserUseCase(mockUserRepository);
      expect(usecase.execute(input)).rejects.toThrowError(
        new BadRequestException('User is not existed'),
      );
      expect(mockUserRepository.findById).toBeCalled();
      expect(updateEmailSpy).not.toBeCalled();
      expect(updateUsernameSpy).not.toBeCalled();
      expect(updateFullNameSpy).not.toBeCalled();
      expect(updateSchoolSpy).not.toBeCalled();
      expect(updateCompanySpy).not.toBeCalled();
      expect(updateAvatarSpy).not.toBeCalled();
      expect(updateMajorSpy).not.toBeCalled();
      expect(updatePasswordSpy).not.toBeCalled();
      expect(mockUserRepository.update).not.toBeCalled();
    });

    it('Email update is not valid', async () => {
      const dto: UpdateUserDto = {
        email: 'updateEmail',
      };
      const existedUser: User = new User(createDto);
      mockUserRepository.findById.mockImplementationOnce(() =>
        Promise.resolve(existedUser),
      );
      const updateEmailSpy = jest.spyOn(existedUser, 'updateEmail');
      const updateUsernameSpy = jest.spyOn(
        existedUser,
        'updateUsername',
      );
      const updateFullNameSpy = jest.spyOn(
        existedUser,
        'updateFullName',
      );
      const updateSchoolSpy = jest.spyOn(existedUser, 'updateSchool');
      const updateCompanySpy = jest.spyOn(
        existedUser,
        'updateCompany',
      );
      const updateAvatarSpy = jest.spyOn(existedUser, 'updateAvatar');
      const updateMajorSpy = jest.spyOn(existedUser, 'updateMajor');
      const updatePasswordSpy = jest.spyOn(
        existedUser,
        'updatePassword',
      );

      const input = new UpdateUserUseCaseInput(id, dto);
      const usecase = new UpdateUserUseCase(mockUserRepository);
      expect(usecase.execute(input)).rejects.toThrowError(
        new BadRequestException('Email is not valid'),
      );
      expect(mockUserRepository.findById).toBeCalled();
      expect(updateEmailSpy).not.toBeCalled();
      expect(updateUsernameSpy).not.toBeCalled();
      expect(updateFullNameSpy).not.toBeCalled();
      expect(updateSchoolSpy).not.toBeCalled();
      expect(updateCompanySpy).not.toBeCalled();
      expect(updateAvatarSpy).not.toBeCalled();
      expect(updateMajorSpy).not.toBeCalled();
      expect(updatePasswordSpy).not.toBeCalled();
      expect(mockUserRepository.update).not.toBeCalled();
    });

    it('Username update is not valid', async () => {
      const dto: UpdateUserDto = {
        username: '3123123',
      };
      const existedUser: User = new User(createDto);
      mockUserRepository.findById.mockImplementationOnce(() =>
        Promise.resolve(existedUser),
      );
      const updateEmailSpy = jest.spyOn(existedUser, 'updateEmail');
      const updateUsernameSpy = jest.spyOn(
        existedUser,
        'updateUsername',
      );
      const updateFullNameSpy = jest.spyOn(
        existedUser,
        'updateFullName',
      );
      const updateSchoolSpy = jest.spyOn(existedUser, 'updateSchool');
      const updateCompanySpy = jest.spyOn(
        existedUser,
        'updateCompany',
      );
      const updateAvatarSpy = jest.spyOn(existedUser, 'updateAvatar');
      const updateMajorSpy = jest.spyOn(existedUser, 'updateMajor');
      const updatePasswordSpy = jest.spyOn(
        existedUser,
        'updatePassword',
      );

      const input = new UpdateUserUseCaseInput(id, dto);
      const usecase = new UpdateUserUseCase(mockUserRepository);

      expect(usecase.execute(input)).rejects.toThrowError(
        new BadRequestException('Username is not valid'),
      );
      expect(updateEmailSpy).not.toBeCalled();
      expect(mockUserRepository.findById).toBeCalled();
      expect(updateUsernameSpy).not.toBeCalled();
      expect(updateFullNameSpy).not.toBeCalled();
      expect(updateSchoolSpy).not.toBeCalled();
      expect(updateCompanySpy).not.toBeCalled();
      expect(updateAvatarSpy).not.toBeCalled();
      expect(updateMajorSpy).not.toBeCalled();
      expect(updatePasswordSpy).not.toBeCalled();
      expect(mockUserRepository.update).not.toBeCalled();
    });
  });
});
