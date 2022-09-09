import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.SECRET,
                signOptions: { expiresIn: '3600s' }
            })
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersService]
})
export class AuthModule { }
