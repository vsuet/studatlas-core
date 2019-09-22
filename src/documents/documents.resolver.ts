import { Args, Query, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { FetchDocumentArgs } from './dto/fetch-document.args';
import { Document } from './models/document.model';
import { DocumentsService } from './documents.service';

@Resolver(of => Document)
export class DocumentsResolver {
  constructor(private readonly documentsService: DocumentsService) {}

  @Query(returns => Document, { name: 'document' })
  fetchDocument(@Args() { academyId, documentId }: FetchDocumentArgs):
    | Observable<Document>
    | any {
    return this.documentsService.fetchById({ academyId, documentId });
  }
}
