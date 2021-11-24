import { Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../shared/guards/gql-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserInfo } from './models/user-info.model';
import { AuthService } from './auth.service';
import { WatchlistBook } from '../books/models/watchlist-book.model';

@Resolver(of => UserInfo)
export class UserInfoResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Query(returns => UserInfo, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  getUserInfo(@CurrentUser() { sub }: JwtPayload): Promise<UserInfo> {
    return this.authService.getUserInfo(sub);
  }

  // @ResolveProperty(returns => [WatchlistBook])
  // @UseGuards(GqlAuthGuard)
  // watchlist(@CurrentUser() { sub }: JwtPayload) {
  //   return this.booksService.getWatchlist(sub);
  // }
}
