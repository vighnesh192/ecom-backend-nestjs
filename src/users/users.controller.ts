import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UpdateUserDto } from './dtos/updateUserDto.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private UsersService: UsersService) { }

    @Get(':id')
    @UseGuards(JwtGuard)
    async getUser(@Param() params): Promise<User> {
        return this.UsersService.findOne({ _id: params.id })
    }

    @Post('update/:id')
    @UseGuards(JwtGuard)
    async updateUser(@Param() params, @Body() user: UpdateUserDto,): Promise<User> {
        return this.UsersService.updateUserById(params.id, user);
    }
}
