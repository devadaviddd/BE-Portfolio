import { BadRequestException } from "../../../../exceptions";
import { IUserRepository, SignUpDto, Company, School, User } from "../../domain";
import { SignUpUseCase, SignUpUseCaseInput } from "../signup.usecase";

describe('Signup Auth Test Suite', () => {
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

    it('Sign up successfully', async() => {
      /** ARRANGE */
      const dto: SignUpDto = {
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
      };

      mockUserRepository.findByEmail.mockImplementation(() =>
        Promise.resolve(null),
      );

      /** ACT */
      const input = new SignUpUseCaseInput(dto);
      const expectResponse = 'Signup successfully';
      const usecase = new SignUpUseCase(mockUserRepository);
      const response = await usecase.execute(input);

      /** ASSERT */
      expect(response).toEqual(expectResponse);
      expect(usecase.execute(input)).resolves;
    })

    it('Execute throw Email is not valid', async () => {
      /** ARRANGE */
      const dto: SignUpDto = {
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
      };

      /** ACT */
      const input = new SignUpUseCaseInput(dto);
      const usecase = new SignUpUseCase(mockUserRepository);

      /** ASSERT */
      expect(usecase.execute(input)).rejects.toThrowError(
        new BadRequestException('Email is not valid'),
      );
      expect(mockUserRepository.findByEmail).not.toBeCalled();
    });

    it('Execute throw Username is not valid', async () => {
      /** ARRANGE */
      const dto: SignUpDto = {
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
      };

      /** ACT */
      const input = new SignUpUseCaseInput(dto);
      const usecase = new SignUpUseCase(mockUserRepository);

      /** ASSERT */
      expect(usecase.execute(input)).rejects.toThrowError(
        new BadRequestException('Username is not valid'),
      );
      expect(mockUserRepository.findByEmail).not.toBeCalled();
    });

    it('Execute missing required Fields', async () => {
      /** ARRANGE */
      const dto: SignUpDto = {
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
      };

      /** ACT */
      const input = new SignUpUseCaseInput(dto);
      const usecase = new SignUpUseCase(mockUserRepository);
      /** ASSERT */
      expect(usecase.execute(input)).rejects.toThrowError(
        new BadRequestException(
          'Required Fields: email, password, fullName, username',
        ),
      );
      expect(mockUserRepository.findByEmail).not.toBeCalled();
    });

    it('Execute throw Password is not valid', async () => {
      /** ARRANGE */
      const dto: SignUpDto = {
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
      };
      /** ACT */
      const input = new SignUpUseCaseInput(dto);
      const usecase = new SignUpUseCase(mockUserRepository);

      /** ASSERT */
      expect(usecase.execute(input)).rejects.toThrowError(
        new BadRequestException('Password is not valid'),
      );
      expect(mockUserRepository.findByEmail).not.toBeCalled();
    });

    it('Execute throw User email already existed', async () => {
      /** ARRANGE */
      const dto: SignUpDto = {
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
      };
      const newUser: User = new User(dto);

      /** ACT */
      const input = new SignUpUseCaseInput(dto);
      const usecase = new SignUpUseCase(mockUserRepository);
      mockUserRepository.findByEmail.mockImplementation(() =>
        Promise.resolve(newUser),
      );

      /** ASSERT */
      expect(usecase.execute(input)).rejects.toThrowError(
        new BadRequestException('User is existed'),
      );
      expect(mockUserRepository.findByEmail).toBeCalled();
    });
  })
})