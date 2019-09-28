import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { GROUP_SCHEMA } from './mocks/group-schema.mock';
import { GrabberService } from '../grabber/grabber.service';
import { Academy } from '../academies/models/academy.model';
import { DIRECTORY_PATH } from '../grabber/path.constants';

@Injectable()
export class GroupsService {
  constructor(private readonly grabberService: GrabberService) {}

  fetch(academy: Academy, params?: any) {
    return this.grabberService
      .createClient()
      .get(DIRECTORY_PATH, {
        baseURL: academy.endpoint,
        params: {
          mode: 'group',
          ...params,
        },
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid('table[id*="ucGroups"]', value.data);
          return dataGrid.extract(GROUP_SCHEMA, academy);
        }),
      );
  }

  fetchById(id: number, academy: Academy) {
    return this.fetch(academy, { id, f: 'group' }).pipe(
      map(groups => groups[0]),
    );
  }

  fetchByFacultyId(id: number, academy: Academy) {
    return this.fetch(academy, { id, f: 'facultet' });
  }

  fetchBySpecialityId(id: number, academy: Academy) {
    return this.fetch(academy, { id, f: 'spets' });
  }

  fetchAll(academy: Academy) {
    return this.fetch(academy);
  }
}
