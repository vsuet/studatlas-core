import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserInfoResolver } from './user-info.resolver';
import { AuthService } from './auth.service';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [PassportModule, forwardRef(() => BooksModule)],
  providers: [JwtStrategy, UserInfoResolver, AuthService],
  exports: [JwtStrategy, AuthService],
})
export class AuthModule {}
