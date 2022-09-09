import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/createUserDto.dto';
import { ExistingUserDto } from 'src/users/dtos/existingUserDto.dto';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authServices: AuthService) { }

    @Post('register')
    async register(@Body() user: CreateUserDto): Promise<User> {
        return this.authServices.register(user);
    }

    @Post('login')
    async login(@Body() user: ExistingUserDto): Promise<{ token } | null> {
        return this.authServices.login(user);
    }
}
