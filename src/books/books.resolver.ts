import {
  Args,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { Book } from './models/book.model';
import { Observable } from 'rxjs';
import { BooksService } from './books.service';
import { GroupsService } from '../groups/groups.service';
import { FetchBookArgs } from './dto/fetch-book.args';
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
    @Parent() { academyId, id }: Book,
  ): Observable<Entry[]> {
    return this.entriesService.fetchByBookId({
      academyId,
      bookId: id,
      semester,
    });
  }

  @ResolveProperty()
  group(@Parent() { academyId, groupId }: Book): Observable<Group> {
    return this.groupsService.fetchById({ academyId, groupId });
  }

  @Query(returns => Book, { name: 'book' })
  fetchBook(@Args() { academyId, bookId }: FetchBookArgs): Observable<Book> {
    return this.booksService.fetchById({ academyId, bookId });
  }
}
