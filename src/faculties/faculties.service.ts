import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { FACULTY_SCHEMA } from './mocks/faculty-schema.mock';
import { GrabberService } from '../grabber/grabber.service';

@Injectable()
export class FacultiesService {
  constructor(private readonly grabberService: GrabberService) {}

  fetchAll(academyId: string) {
    return this.grabberService
      .createClient(academyId)
      .get('/Dek/Default.aspx')
      .pipe(
        map(value => {
          const dataGrid = new DataGrid('table[id*="ucFacultets"]', value.data);
          return dataGrid.extract(FACULTY_SCHEMA);
        }),
      );
  }
}
