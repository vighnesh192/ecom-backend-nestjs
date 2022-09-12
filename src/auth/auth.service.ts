import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/createUserDto.dto';
import { User } from '../users/schemas/user.schema';
import { ExistingUserDto } from '../users/dtos/existingUserDto.dto';

@Injectable()
export class AuthService {
    constructor(
        private UserService: UsersService,
        private jwtService: JwtService,
    ) { }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async register(createUser: Readonly<CreateUserDto>): Promise<User> {
        const newUser = { ...createUser };
        const userExists = this.UserService.findOne({ email: newUser.email });

        if (userExists) {
            throw new HttpException(
                'An account with that email already exists!',
                HttpStatus.CONFLICT,
            );
        }

        const hashedPassword: string = await this.hashPassword(newUser.password);

        newUser.password = hashedPassword;

        return this.UserService.createUser(newUser);
    }

    async validateUser(user: ExistingUserDto): Promise<User | null> {
        const userExists: User = await this.UserService.findOne({ email: user.email })
        if (!userExists) return null;

        const passwordMatched: boolean = await this.doesPasswordMatch(user.password, userExists.password);

        if (!passwordMatched) return null;

        return userExists;
    }

    async doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async login(user: ExistingUserDto): Promise<{ token: string } | null> {
        const userIsValid = await this.validateUser(user);

        if (!userIsValid) throw new HttpException("Credentials Invalid", HttpStatus.UNAUTHORIZED);

        const jwt: string = await this.jwtService.signAsync(userIsValid);

        return { token: jwt };
    }
}
