import { forwardRef, Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { GrabberModule } from '../grabber/grabber.module';
import { GroupsModule } from '../groups/groups.module';
import { EntriesService } from './entries.service';
import { AcademiesModule } from '../academies/academies.module';

@Module({
  imports: [
    forwardRef(() => AcademiesModule),
    GrabberModule,
    forwardRef(() => GroupsModule),
  ],
  providers: [BooksService, BooksResolver, EntriesService],
  exports: [BooksService],
})
export class BooksModule {}
