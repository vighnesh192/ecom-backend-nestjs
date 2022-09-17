import { UserStub } from '../../../auth/test/stubs/user.stub'
import { MockModel } from "../../../database/test/support/mock.model";
import { User } from "../../schemas/user.schema";

export class UserModel extends MockModel<User> {
    protected entityStub = UserStub();
}