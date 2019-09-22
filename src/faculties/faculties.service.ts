import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { FACULTY_SCHEMA } from './mocks/faculty-schema.mock';
import { GrabberService } from '../grabber/grabber.service';
import { FetchFacultyArgs } from './dto/fetch-faculty.args';
import { FetchFacultiesArgs } from './dto/fetch-faculties.args';

@Injectable()
export class FacultiesService {
  constructor(private readonly grabberService: GrabberService) {}

  fetch(academyId: string, params?: any) {
    return this.grabberService
      .createClient(academyId)
      .get('/Dek/Default.aspx', {
        params: {
          mode: 'facultet',
          ...params,
        },
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid('table[id*="ucFacultets"]', value.data);
          const entities = dataGrid.extract(FACULTY_SCHEMA);
          return entities.map(entity => Object.assign(entity, { academyId }));
        }),
      );
  }

  fetchById({ academyId, facultyId }: FetchFacultyArgs) {
    return this.fetch(academyId, { id: facultyId }).pipe(
      map(faculties => faculties[0]),
    );
  }

  fetchAll({ academyId }: FetchFacultiesArgs) {
    return this.fetch(academyId);
  }
}
