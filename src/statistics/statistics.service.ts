import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { GrabberService } from '../grabber/grabber.service';
import { STATISTICS_SCHEMA } from './mocks/statistics-schema.mock';

@Injectable()
export class StatisticsService {
  constructor(private readonly grabberService: GrabberService) {}

  fetch(academyId: string, params?: any) {
    return this.grabberService
      .createClient(academyId)
      .get('/Stat/Default.aspx', {
        params,
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid('table[id*="ucStat"]', value.data);
          const entities = dataGrid.extract(STATISTICS_SCHEMA);
          return entities.map(entity => Object.assign(entity, { academyId }));
        }),
      );
  }

  fetchByDivisionId({ academyId, divisionId }) {
    return this.fetch(academyId, {
      mode: 'statkaf',
      id: divisionId,
      f: 'kaf',
      // year: '2018-2019',
      // sem: 0,
    }).pipe(
      map(statistics => {
        return statistics.find(item => item.divisionId === Number(divisionId));
      }),
    );
  }

  fetchByFacultyId({ academyId, facultyId }) {
    return this.fetch(academyId, {
      mode: 'statfac',
      id: facultyId,
      f: 'kaf',
      // year: '2018-2019',
      // sem: 0,
    }).pipe(
      map(statistics => {
        return statistics.find(item => item.facultyId === facultyId);
      }),
    );
  }
}
