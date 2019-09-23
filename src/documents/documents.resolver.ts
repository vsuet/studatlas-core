import {
  Args,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { FetchDocumentArgs } from './dto/fetch-document.args';
import { Document } from './models/document.model';
import { DocumentsService } from './documents.service';
import { Division } from '../divisions/models/division.model';
import { DivisionsService } from '../divisions/divisions.service';
import { GroupsService } from '../groups/groups.service';
import { Group } from '../groups/models/group.model';

@Resolver(of => Document)
export class DocumentsResolver {
  constructor(
    private readonly divisionsService: DivisionsService,
    private readonly groupsService: GroupsService,
    private readonly documentsService: DocumentsService,
  ) {}

  @ResolveProperty()
  division(@Parent() { divisionId, academyId }: Document): Observable<
    Division
  > {
    return this.divisionsService.fetchById({ academyId, divisionId });
  }

  @ResolveProperty()
  group(@Parent() { groupId, academyId }: Document): Observable<Group> {
    return this.groupsService.fetchById({ academyId, groupId });
  }

  @Query(returns => Document, { name: 'document' })
  fetchDocument(@Args() { academyId, documentId }: FetchDocumentArgs):
    | Observable<Document>
    | any {
    return this.documentsService.fetchById({ academyId, documentId });
  }
}
