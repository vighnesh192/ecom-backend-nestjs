import { getModelToken } from "@nestjs/mongoose"
import { Test } from "@nestjs/testing"
import { FilterQuery } from "mongoose"
import { UserStub } from "../../auth/test/stubs/user.stub"
import { User } from "../schemas/user.schema"
import { UsersRepository } from "../users.repository"
import { UserModel } from "./support/user.model"

describe('UsersRepository', () => {
    let usersRepository: UsersRepository;
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

})