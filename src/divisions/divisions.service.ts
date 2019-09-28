import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { DIVISION_SCHEMA } from './mocks/division-schema.mock';
import { GrabberService } from '../grabber/grabber.service';
import { Academy } from '../academies/models/academy.model';
import { DIRECTORY_PATH } from '../grabber/path.constants';

@Injectable()
export class DivisionsService {
  constructor(private readonly grabberService: GrabberService) {}

  fetch(academy: Academy, params?: any) {
    return this.grabberService
      .createClient()
      .get(DIRECTORY_PATH, {
        baseURL: academy.endpoint,
        params: {
          mode: 'kaf',
          ...params,
        },
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid('table[id*="ucKaf"]', value.data);
          return dataGrid.extract(DIVISION_SCHEMA, academy);
        }),
      );
  }

  fetchById(id: number, academy: Academy) {
    return this.fetch(academy, { id, f: 'kaf' }).pipe(
      map(divisions => divisions[0]),
    );
  }

  fetchAll(academy: Academy) {
    return this.fetch(academy);
  }
}
