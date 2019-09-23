import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsResolver } from './documents.resolver';
import { GrabberModule } from '../grabber/grabber.module';
import { DivisionsModule } from '../divisions/divisions.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [GrabberModule, DivisionsModule, GroupsModule],
  providers: [DocumentsService, DocumentsResolver],
  exports: [DocumentsService],
})
export class DocumentsModule {}
