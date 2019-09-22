import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { SPECIALITY_SCHEMA } from './mocks/speciality-schema.mock';
import { GrabberService } from '../grabber/grabber.service';

@Injectable()
export class SpecialitiesService {
  constructor(private readonly grabberService: GrabberService) {}

  fetchAll(academyId: string) {
    return this.grabberService
      .createClient(academyId)
      .get('/Dek/Default.aspx', {
        params: {
          mode: 'spets',
        },
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid('table[id*="ucSpets"]', value.data);
          return dataGrid.extract(SPECIALITY_SCHEMA);
        }),
      );
  }
}
