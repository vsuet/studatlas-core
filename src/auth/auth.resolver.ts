import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../shared/guards/gql-auth.guard';
import { ConfigParam, Configurable } from 'nestjs-config';
import { CurrentUser } from './decorators/current-user.decorator';
import { ManagementClient } from 'auth0';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserInfo } from './models/user-info.model';

@Resolver('Auth')
export class AuthResolver {
  @Query(returns => UserInfo, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  @Configurable()
  getUserInfo(
    @CurrentUser() currentUser: JwtPayload,
    @ConfigParam('auth0.domain') domain: string,
    @ConfigParam('auth0.clientId') clientId: string,
    @ConfigParam('auth0.clientSecret') clientSecret: string,
  ): Promise<UserInfo> {
    const authZero = new ManagementClient({
      domain,
      clientId,
      clientSecret,
      scope: 'read:users update:users',
    });

    return authZero.getUser({ id: currentUser.sub });
  }
}
