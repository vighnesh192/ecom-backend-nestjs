import { addressType } from "../types/address.type";

export class UpdateUserDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    address?: addressType;
    phoneNo?: number;
    type?: string;
}