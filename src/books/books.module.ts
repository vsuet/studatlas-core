import { forwardRef, Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { GrabberModule } from '../grabber/grabber.module';
import { GroupsModule } from '../groups/groups.module';
import { EntriesService } from './entries.service';
import { AcademiesModule } from '../academies/academies.module';
import { AuthModule } from '../auth/auth.module';
import { WatchlistBooksResolver } from './watchlist-books.resolver';

@Module({
  imports: [
    forwardRef(() => AcademiesModule),
    GrabberModule,
    AuthModule,
    forwardRef(() => GroupsModule),
  ],
  providers: [
    BooksService,
    BooksResolver,
    EntriesService,
    WatchlistBooksResolver,
  ],
  exports: [BooksService],
})
export class BooksModule {}
