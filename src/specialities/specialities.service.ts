import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { SPECIALITY_SCHEMA } from './mocks/speciality-schema.mock';
import { GrabberService } from '../grabber/grabber.service';
import { Academy } from '../academies/models/academy.model';
import { DIRECTORY_PATH } from '../grabber/path.constants';

@Injectable()
export class SpecialitiesService {
  constructor(private readonly grabberService: GrabberService) {}

  fetch(academy: Academy, params?: any) {
    return this.grabberService
      .createClient()
      .get(DIRECTORY_PATH, {
        baseURL: academy.endpoint,
        params: {
          mode: 'spets',
          ...params,
        },
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid('table[id*="ucSpets"]', value.data);
          return dataGrid.extract(SPECIALITY_SCHEMA, academy);
        }),
      );
  }

  fetchById(id: number, academy: Academy) {
    return this.fetch(academy, { id, f: 'spets' }).pipe(
      map(specialities => specialities[0]),
    );
  }

  fetchByFacultyId(facultyId: number, academy: Academy) {
    return this.fetch(academy, { f: 'facultet', id: facultyId });
  }

  fetchAll(academy: Academy) {
    return this.fetch(academy);
  }
}
