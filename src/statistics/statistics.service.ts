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

  fetchByDivisionId({ academyId, divisionId, year, semester }) {
    return this.fetch(academyId, {
      mode: 'statkaf',
      year,
      sem: semester,
    }).pipe(
      map(statistics => {
        return statistics.find(item => item.divisionId === Number(divisionId));
      }),
    );
  }

  fetchByFacultyId({ academyId, facultyId, year, semester }) {
    return this.fetch(academyId, {
      mode: 'statfac',
      year,
      sem: semester,
    }).pipe(
      map(statistics => {
        return statistics.find(item => item.facultyId === facultyId);
      }),
    );
  }
}
