import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET
        })
    }

    // Validate is called by Passport and serializes the returned value in the req object.
    // Payload is extracted from the jwt token which equals to User object in this case
    async validate(payload: any) {
        return { id: payload.sub, email: payload.email };
    }
}