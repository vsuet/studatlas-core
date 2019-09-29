import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy, AuthResolver],
  exports: [JwtStrategy],
})
export class AuthModule {}
