import { UserStub } from "../test/stubs/user.stub";

export const AuthService = jest.fn().mockReturnValue({
    hashPassword: jest.fn().mockResolvedValue(''),
    register: jest.fn().mockResolvedValue(UserStub()),
    validateUser: jest.fn().mockResolvedValue(UserStub() || null),
    login: jest.fn().mockResolvedValue({ token: '' }),
    doesPasswordMatch: jest.fn().mockResolvedValue(true)
})