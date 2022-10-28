import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CreateUserDto } from './dtos/createUserDto.dto';
import { UpdateUserDto } from './dtos/updateUserDto.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly UsersRepository: UsersRepository) { }

    async findOne(userFilterQuery: FilterQuery<User>): Promise<UserDocument> {
        return this.UsersRepository.findOne(userFilterQuery);
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.UsersRepository.create(createUserDto);
    }

    async updateUserById(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.UsersRepository.findOneAndUpdate({ _id: userId }, updateUserDto);
    }


}
