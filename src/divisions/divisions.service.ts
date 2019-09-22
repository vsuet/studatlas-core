import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { DIVISION_SCHEMA } from './mocks/division-schema.mock';
import { GrabberService } from '../grabber/grabber.service';
import { FetchDivisionArgs } from './dto/fetch-division.args';
import { FetchDivisionsArgs } from './dto/fetch-divisions.args';

@Injectable()
export class DivisionsService {
  constructor(private readonly grabberService: GrabberService) {}

  fetch(academyId: string, params?: any) {
    return this.grabberService
      .createClient(academyId)
      .get('/Dek/Default.aspx', {
        params: {
          mode: 'kaf',
          ...params,
        },
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid('table[id*="ucKaf"]', value.data);
          const entities = dataGrid.extract(DIVISION_SCHEMA);
          return entities.map(entity => Object.assign(entity, { academyId }));
        }),
      );
  }

  fetchById({ academyId, divisionId }: FetchDivisionArgs) {
    return this.fetch(academyId, { id: divisionId, f: 'kaf' }).pipe(
      map(divisions => divisions[0]),
    );
  }

  fetchAll({ academyId }: FetchDivisionsArgs) {
    return this.fetch(academyId);
  }
}
