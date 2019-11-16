import { Module } from '@nestjs/common';
import { BooksResolver } from './books.resolver';
// import { WatchlistBooksResolver } from './watchlist-books.resolver';

@Module({
  providers: [
    BooksResolver,
    // WatchlistBooksResolver,
  ],
})
export class BooksModule {}
