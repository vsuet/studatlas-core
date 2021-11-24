import { Args, Query, Resolver } from '@nestjs/graphql';
import { Document } from './models/document.model';
import { EntityResolver } from '../shared/classes/entity-resolver.class';
import { FetchDocumentArgs } from './dto/fetch-document.args';
import { map } from 'rxjs/operators';
import { SaveStory } from './models/save-story.model';
import { DocumentService } from './interfaces/document-service.interface';

// tslint:disable-next-line:no-shadowed-variable
@Resolver(of => Document)
export class DocumentsResolver extends EntityResolver {
  private documentService: DocumentService;

  onModuleInit() {
    this.documentService = this.client.getService<DocumentService>(
      'DocumentService',
    );
  }

  @Query(returns => Document, { name: 'document' })
  getDocument(@Args() { id, academyId }: FetchDocumentArgs) {
    return this.documentService.getDocument({ id, academyId });
  }

  @Query(returns => [SaveStory], { name: 'saveStories' })
  getSaveStories(@Args() { id, academyId }: FetchDocumentArgs) {
    return this.documentService
      .listDocumentSaveStories({ id, academyId })
      .pipe(map(({ data }) => data));
  }
}
