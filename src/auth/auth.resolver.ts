import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../shared/guards/gql-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserInfo } from './models/user-info.model';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(returns => UserInfo, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  getUserInfo(@CurrentUser() currentUser: JwtPayload): Promise<UserInfo> {
    return this.authService.getUserInfo(currentUser.sub);
  }
}
