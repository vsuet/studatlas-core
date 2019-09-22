import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { SPECIALITY_SCHEMA } from './mocks/speciality-schema.mock';
import { GrabberService } from '../grabber/grabber.service';
import { FetchSpecialityArgs } from './dto/fetch-speciality.args';
import { FetchSpecialitiesArgs } from './dto/fetch-specialities.args';

@Injectable()
export class SpecialitiesService {
  constructor(private readonly grabberService: GrabberService) {}

  fetch(academyId: string, params?: any) {
    return this.grabberService
      .createClient(academyId)
      .get('/Dek/Default.aspx', {
        params: {
          mode: 'spets',
          ...params,
        },
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid('table[id*="ucSpets"]', value.data);
          return dataGrid.extract(SPECIALITY_SCHEMA);
        }),
      );
  }

  fetchById({ academyId, specialityId }: FetchSpecialityArgs) {
    return this.fetch(academyId, { id: specialityId }).pipe(
      map(specialities => specialities[0]),
    );
  }

  fetchAll({ academyId }: FetchSpecialitiesArgs) {
    return this.fetch(academyId);
  }
}
