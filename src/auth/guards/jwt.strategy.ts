import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { User } from "../models/user.entity";

// use PassportStrategy to create a strategy for JWT to Validate the JWT
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extract token from header
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: any) {
        const { email } = payload.user;
        const user = await this.userRepository.findOne({ email });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user // nested object with user data
    }

}


