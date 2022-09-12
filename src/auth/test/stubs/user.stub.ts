import { User } from "../../../users/schemas/user.schema";

export const UserStub = (): User => {
    return {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        address: {
            line1: 'Mumbai',
            line2: 'Maharashtra',
            pincode: 123456
        },
        phoneNo: 1234567890,
        password: "password"
    }
}