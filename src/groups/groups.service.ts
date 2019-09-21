import { HttpService, Injectable } from '@nestjs/common';
import { Academy } from '../academies/models/academy.model';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { GROUP_SCHEMA } from './mocks/group-schema.mock';

@Injectable()
export class GroupsService {
  constructor(private readonly httpService: HttpService) {}

  fetchAll(academy: Academy) {
    return this.httpService
      .get('/Dek/Default.aspx', {
        baseURL: academy.endpoint,
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
