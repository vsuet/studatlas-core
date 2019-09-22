import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { GROUP_SCHEMA } from './mocks/group-schema.mock';
import { GrabberService } from '../grabber/grabber.service';
import { FetchGroupArgs } from './dto/fetch-group.args';
import { FetchGroupsArgs } from './dto/fetch-groups.args';

@Injectable()
export class GroupsService {
  constructor(private readonly grabberService: GrabberService) {}

  fetch(academyId: string, params?: any) {
    return this.grabberService
      .createClient(academyId)
      .get('/Dek/Default.aspx', {
        params: {
          mode: 'group',
          ...params,
        },
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid('table[id*="ucGroups"]', value.data);
          return dataGrid.extract(GROUP_SCHEMA);
        }),
      );
  }

  fetchById({ academyId, groupId }: FetchGroupArgs) {
    return this.fetch(academyId, { id: groupId }).pipe(
      map(groups => groups[0]),
    );
  }

  fetchByFacultyId({ academyId, facultyId }) {
    return this.fetch(academyId, { id: facultyId, f: 'facultet' });
  }

  fetchBySpecialityId({ academyId, specialityId }) {
    return this.fetch(academyId, { id: specialityId, f: 'spets' });
  }

  fetchAll({ academyId }: FetchGroupsArgs) {
    return this.fetch(academyId);
  }
}
