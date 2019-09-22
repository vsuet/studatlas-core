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
          const entities = dataGrid.extract(SPECIALITY_SCHEMA);
          return entities.map(entity => Object.assign(entity, { academyId }));
        }),
      );
  }

  fetchById({ academyId, specialityId }: FetchSpecialityArgs) {
    return this.fetch(academyId, { id: specialityId, f: 'spets' }).pipe(
      map(specialities => specialities[0]),
    );
  }

  fetchByFacultyId({ academyId, facultyId }) {
    return this.fetch(academyId, { f: 'facultet', id: facultyId });
  }

  fetchAll({ academyId }: FetchSpecialitiesArgs) {
    return this.fetch(academyId);
  }
}
