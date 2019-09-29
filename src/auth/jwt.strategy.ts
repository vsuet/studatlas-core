import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { JwtPayload } from './interfaces/jwt-payload.interface';

// TODO: prod!!!!!
const envConfig = dotenv.parse(fs.readFileSync('.env'));

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${envConfig.AUTH0_DOMAIN}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 1
      audience: 'http://localhost:3000',
      issuer: `https://${envConfig.AUTH0_DOMAIN}/`,
    });
  }

  validate(payload: any, done: VerifiedCallback): JwtPayload {
    if (!payload) {
      done(new UnauthorizedException(), false); // 2
    }

    return payload;
  }
}
