import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { GrabberService } from '../grabber/grabber.service';
import { BOOK_SCHEMA } from './mocks/book-schema.mock';
import { Academy } from '../academies/models/academy.model';
import { DIRECTORY_PATH } from '../grabber/path.constants';

@Injectable()
export class BooksService {
  constructor(private readonly grabberService: GrabberService) {}

  fetch(academy: Academy, params?: any) {
    return this.grabberService
      .createClient()
      .get(DIRECTORY_PATH, {
        baseURL: academy.endpoint,
        params: {
          mode: 'stud',
          ...params,
        },
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid('table[id*="ucStud"]', value.data);
          return dataGrid.extract(BOOK_SCHEMA, academy);
        }),
      );
  }

  fetchById(id: number, academy: Academy) {
    return this.fetch(academy, { id, f: 'stud' }).pipe(map(books => books[0]));
  }

  fetchByGroupId(groupId: number, academy: Academy) {
    return this.fetch(academy, { id: groupId, f: 'group' });
  }
}
