import { Injectable } from '@nestjs/common';
import { GrabberService } from '../grabber/grabber.service';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { ENTRY_SCHEMA } from './mocks/entry-schema.mock';

@Injectable()
export class EntriesService {
  constructor(private readonly grabberService: GrabberService) {}

  fetch(academyId: string, params?: any) {
    return this.grabberService
      .createClient(academyId)
      .get('/Ved/ZachBooks.aspx', {
        params,
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid(
            'table[id*="ContentPage_Grid"]',
            value.data,
          );
          const entities = dataGrid.extract(ENTRY_SCHEMA);
          console.log(entities)
          return entities.map(entity => Object.assign(entity, { academyId }));
        }),
      );
  }

  fetchByBookId({ academyId, bookId, semester }) {
    return this.fetch(academyId, { id: bookId, sem: semester });
  }
}
