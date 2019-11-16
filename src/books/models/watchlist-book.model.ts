import { Field, ID, ObjectType } from 'type-graphql';
import { Academy } from '../../academies/models/academy.model';
import { Book } from './book.model';

@ObjectType()
export class WatchlistBook {
  @Field(type => ID)
  bookId: number;

  // зачетка могла быть удалена
  @Field(type => Book, { nullable: true })
  book?: Book;

  academyId: string;

  @Field(type => Academy)
  academy: Academy;
}
