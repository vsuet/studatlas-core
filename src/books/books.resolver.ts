import { Args, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Book } from './models/book.model';
import { Observable } from 'rxjs';
import { BooksService } from './books.service';
import { GroupsService } from '../groups/groups.service';
import { FetchBookArgs } from './dto/fetch-book.args';
import { Group } from '../groups/models/group.model';

@Resolver(of => Book)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly groupsService: GroupsService,
  ) {}

  @ResolveProperty()
  group(@Parent() { academyId, groupId }: Book): Observable<Group> {
    return this.groupsService.fetchById({ academyId, groupId });
  }

  @Query(returns => Book, { name: 'book' })
  fetchBook(@Args() { academyId, bookId }: FetchBookArgs): Observable<Book> {
    return this.booksService.fetchById({ academyId, bookId });
  }
}
