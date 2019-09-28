import { Args, Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Book } from './models/book.model';
import { Observable } from 'rxjs';
import { BooksService } from './books.service';
import { GroupsService } from '../groups/groups.service';
import { Group } from '../groups/models/group.model';
import { EntriesService } from './entries.service';
import { Entry } from './models/entry.model';
import { EntriesFilterArgs } from './dto/entries-filter.args';

@Resolver(of => Book)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly entriesService: EntriesService,
    private readonly groupsService: GroupsService,
  ) {}

  @ResolveProperty()
  entries(
    @Args() { semester }: EntriesFilterArgs,
    @Parent() { id, academy }: Book,
  ): Observable<Entry[]> {
    return this.entriesService.fetchByBookId(id, semester, academy);
  }

  @ResolveProperty()
  group(
    @Parent() { groupId, academy }: Book,
  ): Observable<Group> {
    return this.groupsService.fetchById(groupId, academy);
  }
}
