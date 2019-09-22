import { forwardRef, Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { GrabberModule } from '../grabber/grabber.module';
import { GroupsModule } from '../groups/groups.module';
import { EntriesService } from './entries.service';

@Module({
  imports: [GrabberModule, forwardRef(() => GroupsModule)],
  providers: [BooksService, BooksResolver, EntriesService],
  exports: [BooksService],
})
export class BooksModule {}
