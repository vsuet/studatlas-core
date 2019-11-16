import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { Entry } from '../models/entry.model';

export interface BookService {
  listGroupBooks(data: {
    groupId: number;
    academyId: string;
  }): Observable<{ data: Book[] }>;

  listBookEntries(data: {
    id: number;
    semester: number;
    academyId: string;
  }): Observable<{ data: Entry[] }>;
}
