import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { DocumentMember } from './models/document-member.model';
import { BooksService } from '../books/books.service';
import { Book } from '../books/models/book.model';

@Resolver(of => DocumentMember)
export class DocumentMembersResolver {
  constructor(private readonly booksService: BooksService) {}

  @ResolveProperty()
  book(@Parent() { bookId, academy }: DocumentMember): Observable<Book> {
    return this.booksService.fetchById(bookId, academy);
  }
}
