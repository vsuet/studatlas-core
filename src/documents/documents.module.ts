import { Module } from '@nestjs/common';
import { DocumentsResolver } from './documents.resolver';
// import { DocumentMembersResolver } from './document-members.resolver';

@Module({
  providers: [
    DocumentsResolver,
    // DocumentMembersResolver,
  ],
})
export class DocumentsModule {}
