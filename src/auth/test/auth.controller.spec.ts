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
import { ExistingUserDto } from '../../users/dtos/existingUserDto.dto';
import { JwtService } from '@nestjs/jwt';

jest.mock('../auth.service');
jest.mock('../../users/users.service');

// Given-When-Then Testing Pattern
describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  // let model: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [UsersModule],
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(() => 'token')
          }
        }
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
    jwtService = module.get<JwtService>(JwtService);
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

  describe('Login', () => {
    describe('When login is called', () => {
      let token: Object;
      let existingUserStub: ExistingUserDto;

      beforeEach(async () => {
        existingUserStub = {
          email: "hello@hello.com",
          password: "hello"
        }
        token = await authController.login(existingUserStub);
        console.log("TOKEN", token);
      })

      test('then it should call authService.login', () => {
        expect(authService.login).toBeCalledWith(existingUserStub);
      })

      test('then it should return token', () => {
        expect(token).toEqual({ token: '' })
      })
    })
  })
});
