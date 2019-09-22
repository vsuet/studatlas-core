import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { GrabberService } from '../grabber/grabber.service';
import { BOOK_SCHEMA } from './mocks/book-schema.mock';

@Injectable()
export class BooksService {
  constructor(private readonly grabberService: GrabberService) {}

  fetch(academyId: string, params?: any) {
    return this.grabberService
      .createClient(academyId)
      .get('/Dek/Default.aspx', {
        params: {
          mode: 'stud',
          ...params,
        },
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid('table[id*="ucStud"]', value.data);
          const entities = dataGrid.extract(BOOK_SCHEMA);
          return entities.map(entity => Object.assign(entity, { academyId }));
        }),
      );
  }

  fetchByGroupId({ academyId, groupId }) {
    return this.fetch(academyId, { id: groupId, f: 'group' });
  }
}
