import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { DIVISION_SCHEMA } from './mocks/division-schema.mock';
import { GrabberService } from '../grabber/grabber.service';

@Injectable()
export class DivisionsService {
  constructor(private readonly grabberService: GrabberService) {}

  fetchAll(academyId: string) {
    return this.grabberService
      .createClient(academyId)
      .get('/Dek/Default.aspx', {
        params: {
          mode: 'kaf',
        },
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid('table[id*="ucKaf"]', value.data);
          return dataGrid.extract(DIVISION_SCHEMA);
        }),
      );
  }
}
