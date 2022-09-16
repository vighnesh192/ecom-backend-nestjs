import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../../users/users.module';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { UsersService } from '../../users/users.service';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UserStub } from './stubs/user.stub';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../../users/test/support/user.model';

jest.mock('../auth.service');
jest.mock('../../users/users.service');

// Given-When-Then Testing Pattern
describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let usersService: UsersService;
  // let model: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [UsersModule],
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        // {
        //   provide: getModelToken(User.name),
        //   // notice that only the functions we call from the model are mocked
        //   useClass: UserModel
        // }
      ]
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    // model = module.get<Model<UserDocument>>(getModelToken(User.name));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  })

  describe('register', () => {
    describe('When register is called', () => {
      let user: Omit<User, "password">;

      beforeEach(async () => {
        user = await authController.register(UserStub());
      })

      test('then it should call authService.register', async () => {
        await expect(authService.register).toBeCalledWith(UserStub());
      })

      // test('which calls usersService.createUser', async () => {
      //   const createUserServiceSpy = jest.spyOn(usersService, 'createUser').mockResolvedValueOnce(UserStub());
      //   console.log(UserStub())
      //   await expect(createUserServiceSpy).toBeCalledWith(UserStub());
      // })

      test('then it should return a user', async () => {
        await expect(user).toEqual(UserStub());
      })
    })
  })
});
