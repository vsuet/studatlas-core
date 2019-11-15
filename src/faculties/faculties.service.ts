import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { FACULTY_SCHEMA } from './mocks/faculty-schema.mock';
import { GrabberService } from '../grabber/grabber.service';
import { Academy } from '../academies/models/academy.model';
import { DIRECTORY_PATH } from '../grabber/path.constants';
import { Observable } from 'rxjs';
import { BaseEntitiesService } from '../shared/services/base-entities.service';
import { FacultyConnection } from './models/faculty-connection.model';

@Injectable()
export class FacultiesService extends BaseEntitiesService<FacultyConnection> {
  constructor(private readonly grabberService: GrabberService) {
    super();
  }

  fetch(academy: Academy, params?: any): Observable<any[]> {
    return this.grabberService
      .createClient()
      .get(DIRECTORY_PATH, {
        baseURL: academy.endpoint,
        params: {
          mode: 'facultet',
          ...params,
        },
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid('table[id*="ucFacultets"]', value.data);
          return dataGrid.extract(FACULTY_SCHEMA, academy);
        }),
      );
  }

  fetchById(id: number, academy: Academy) {
    return this.fetch(academy, { id }).pipe(
      map(faculties => faculties[0]),
    );
  }

  fetchAll(academy: Academy) {
    return this.fetch(academy);
  }
}
