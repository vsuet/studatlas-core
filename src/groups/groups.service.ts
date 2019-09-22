import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { GROUP_SCHEMA } from './mocks/group-schema.mock';
import { GrabberService } from '../grabber/grabber.service';

@Injectable()
export class GroupsService {
  constructor(private readonly grabberService: GrabberService) {}

  fetchAll(academyId: string) {
    return this.grabberService
      .createClient(academyId)
      .get('/Dek/Default.aspx', {
        params: {
          mode: 'group',
        },
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid('table[id*="ucGroups"]', value.data);
          return dataGrid.extract(GROUP_SCHEMA);
        }),
      );
  }
}
