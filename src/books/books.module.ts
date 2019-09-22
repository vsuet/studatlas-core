import { forwardRef, Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { GrabberModule } from '../grabber/grabber.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [GrabberModule, forwardRef(() => GroupsModule)],
  providers: [BooksService, BooksResolver],
  exports: [BooksService],
})
export class BooksModule {}
