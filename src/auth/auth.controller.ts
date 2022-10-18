import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from '../users/dtos/createUserDto.dto';
import { ExistingUserDto } from '../users/dtos/existingUserDto.dto';
import { User } from '../users/schemas/user.schema';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authServices: AuthService) { }

    @Post('register')
    async register(@Body() user: CreateUserDto): Promise<User> {
        return this.authServices.register(user);
    }

    @Post('login')
    async login(@Body() user: ExistingUserDto): Promise<{ token: string } | null> {
        return this.authServices.login(user);
    }

    @UseGuards(JwtGuard)
    @Get('checkLoggedIn')
    async checkLoggedin(@Request() req) {
        return {
            loggedIn: true,
            profile: req.user,
        }
    }
}
