import { HttpService, Injectable } from '@nestjs/common';
import { Academy } from '../academies/models/academy.model';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { DIVISION_SCHEMA } from './mocks/division-schema.mock';

@Injectable()
export class DivisionsService {
  constructor(private readonly httpService: HttpService) {}

  fetchAll(academy: Academy) {
    return this.httpService
      .get('/Dek/Default.aspx', {
        baseURL: academy.endpoint,
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
