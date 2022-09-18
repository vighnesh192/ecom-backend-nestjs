import { getModelToken } from "@nestjs/mongoose"
import { Test } from "@nestjs/testing"
import { FilterQuery } from "mongoose"
import { UserStub } from "../../auth/test/stubs/user.stub"
import { User } from "../schemas/user.schema"
import { UsersRepository } from "../users.repository"
import { UserModel } from "./support/user.model"

describe('UsersRepository', () => {
    let usersRepository: UsersRepository;


    describe('find operations', () => {
        let userModel: UserModel;
        let userFilterQuery: FilterQuery<User>

        beforeEach(async () => {
            const moduleRef = await Test.createTestingModule({
                providers: [
                    UsersRepository,
                    {
                        provide: getModelToken(User.name),
                        useClass: UserModel
                    }
                ]
            }).compile()

            usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
            userModel = moduleRef.get<UserModel>(getModelToken(User.name));
            userFilterQuery = {
                phoneNo: UserStub().phoneNo
            }

            jest.clearAllMocks();
        })

        describe('findOne', () => {
            describe('when findOne is called', () => {
                let user: User;

                beforeEach(async () => {
                    jest.spyOn(userModel, 'findOne');
                    user = await usersRepository.findOne(userFilterQuery);
                })

                test('then it should call userModel', () => {
                    expect(userModel.findOne).toHaveBeenCalledWith(userFilterQuery, {});
                })

                test('then the result should equal user', () => {
                    expect(user).toEqual(UserStub())
                })
            })
        })

        describe('find', () => {
            describe('when find is called', () => {
                let users: User[];

                beforeEach(async () => {
                    jest.spyOn(userModel, 'find');
                    users = await usersRepository.find(userFilterQuery);
                })

                test('it should call userModel', () => {
                    expect(userModel.find).toHaveBeenCalledWith(userFilterQuery);
                })

                test('then the result should equal users', () => {
                    expect(users).toEqual([UserStub()])
                })
            })
        })

        describe('findOneAndUpdate', () => {
            describe('when findOneAndUpdate is called', () => {
                let user: User;

                beforeEach(async () => {
                    jest.spyOn(userModel, 'findOneAndUpdate');
                    user = await usersRepository.findOneAndUpdate(userFilterQuery, UserStub());
                })

                test('it should call userModel', () => {
                    expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(userFilterQuery, UserStub(), { new: true });
                })

                test('then the result should equal users', () => {
                    expect(user).toEqual(UserStub())
                })
            })
        })
    })

    describe('create operations', () => {

        beforeEach(async () => {
            const moduleRef = await Test.createTestingModule({
                providers: [
                    UsersRepository,
                    {
                        provide: getModelToken(User.name),
                        useClass: UserModel
                    }
                ]
            }).compile()

            usersRepository = moduleRef.get<UsersRepository>(UsersRepository);

            jest.clearAllMocks();
        })

        describe('create', () => {
            describe('when create is called', () => {
                let user: User;
                let constructorSpy: jest.SpyInstance;
                let saveSpy: jest.SpyInstance;

                beforeEach(async () => {
                    constructorSpy = jest.spyOn(UserModel.prototype, 'constructorSpy');
                    saveSpy = jest.spyOn(UserModel.prototype, 'save');
                    user = await usersRepository.create(UserStub());
                })

                test('then it should call the userModel', () => {
                    expect(saveSpy).toHaveBeenCalled();
                    expect(constructorSpy).toHaveBeenCalledWith(UserStub());
                })

                test('then it should return user', () => {
                    expect(user).toEqual(UserStub());
                })
            })
        })
    })


})