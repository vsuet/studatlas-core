import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy, AuthResolver, AuthService],
  exports: [JwtStrategy, AuthService],
})
export class AuthModule {}
