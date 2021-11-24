import { Args, Query, Resolver } from '@nestjs/graphql';
import { Book } from './models/book.model';
import { EntityResolver } from '../shared/classes/entity-resolver.class';
import { BookService } from './interfaces/book-service.interface';
import { FetchEntriesArgs } from './dto/fetch-entries.args';
import { map } from 'rxjs/operators';
import { Entry } from './models/entry.model';
import { FetchGroupBooksArgs } from './dto/fetch-group-books.args';

@Resolver(of => Book)
export class BooksResolver extends EntityResolver {
  private bookService: BookService;

  onModuleInit() {
    this.bookService = this.client.getService<BookService>('BookService');
  }

  @Query(returns => [Book], { name: 'groupBooks' })
  getBooksByGroup(@Args() { groupId, academyId }: FetchGroupBooksArgs) {
    return this.bookService
      .listGroupBooks({ groupId, academyId })
      .pipe(map(({ data }) => data));
  }

  @Query(returns => [Entry], { name: 'bookEntries' })
  getBookEntries(@Args() { id, semester, academyId }: FetchEntriesArgs) {
    return this.bookService
      .listBookEntries({ id, semester, academyId })
      .pipe(map(({ data }) => data));
  }

  // @Mutation(returns => Boolean)
  // @UseGuards(GqlAuthGuard)
  // async subscribeBook(
  //   @CurrentUser() { sub }: JwtPayload,
  //   @Args() { academyId, bookId }: SubscribeBookArgs,
  // ): Promise<boolean> {
  //   return await this.booksService.toggleWatchlist(
  //     sub,
  //     academyId,
  //     bookId,
  //     'add',
  //   );
  // }
  //
  // @Mutation(returns => Boolean)
  // @UseGuards(GqlAuthGuard)
  // async unsubscribeBook(
  //   @CurrentUser() { sub }: JwtPayload,
  //   @Args() { academyId, bookId }: SubscribeBookArgs,
  // ): Promise<boolean> {
  //   return await this.booksService.toggleWatchlist(
  //     sub,
  //     academyId,
  //     bookId,
  //     'remove',
  //   );
  // }
}
