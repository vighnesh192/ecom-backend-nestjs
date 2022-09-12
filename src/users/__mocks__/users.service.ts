import { UserStub } from "../../auth/test/stubs/user.stub";

export const UsersService = jest.fn().mockReturnValue({
    findOne: jest.fn().mockResolvedValue(UserStub()),
    createUser: jest.fn().mockResolvedValue(UserStub()),
    updateUser: jest.fn().mockResolvedValue(UserStub())
})