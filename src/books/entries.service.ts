import { Injectable } from '@nestjs/common';
import { GrabberService } from '../grabber/grabber.service';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { ENTRY_SCHEMA } from './mocks/entry-schema.mock';
import { Academy } from '../academies/models/academy.model';

@Injectable()
export class EntriesService {
  constructor(private readonly grabberService: GrabberService) {}

  fetch(academy: Academy, params?: any) {
    return this.grabberService
      .createClient()
      .get('/Ved/ZachBooks.aspx', {
        params,
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid(
            'table[id*="ContentPage_Grid"]',
            value.data,
          );
          return dataGrid.extract(ENTRY_SCHEMA, academy);
        }),
      );
  }

  fetchByBookId(id: number, semester: number, academy: Academy) {
    return this.fetch(academy, { id, sem: semester });
  }
}
