import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../../users/users.module';
import { User } from '../../users/schemas/user.schema';
import { UsersService } from '../../users/users.service';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UserStub } from './stubs/user.stub';

jest.mock('../auth.service');
jest.mock('../../users/users.service');

// Given-When-Then Testing Pattern
describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [AuthController],
      providers: [AuthService, UsersService]
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('register', () => {
    describe('When register is called', () => {
      let user: Omit<User, "password">;

      beforeEach(async () => {
        user = await authController.register(UserStub())
      })

      test('then it should call authService.register', () => {
        expect(authService.register).toBeCalledWith(UserStub());
      })

      test('where usersService.createUser is called', () => {
        expect(usersService.createUser).toBeCalledWith(UserStub());
      })

      test('then it should return a user', () => {
        expect(user).toEqual(UserStub());
      })
    })
  })
});
