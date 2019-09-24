import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsResolver } from './documents.resolver';
import { GrabberModule } from '../grabber/grabber.module';
import { DivisionsModule } from '../divisions/divisions.module';
import { GroupsModule } from '../groups/groups.module';
import { DocumentMembersResolver } from './document-members.resolver';
import { BooksModule } from '../books/books.module';
import { SaveStoriesService } from './save-stories.service';

@Module({
  imports: [GrabberModule, DivisionsModule, GroupsModule, BooksModule],
  providers: [
    DocumentsService,
    DocumentsResolver,
    DocumentMembersResolver,
    SaveStoriesService,
  ],
  exports: [DocumentsService],
})
export class DocumentsModule {}
