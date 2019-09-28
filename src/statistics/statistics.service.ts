import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { GrabberService } from '../grabber/grabber.service';
import { STATISTICS_SCHEMA } from './mocks/statistics-schema.mock';
import { Academy } from '../academies/models/academy.model';

@Injectable()
export class StatisticsService {
  constructor(private readonly grabberService: GrabberService) {}

  fetch(academy: Academy, params?: any) {
    return this.grabberService
      .createClient()
      .get('/Stat/Default.aspx', {
        baseURL: academy.endpoint,
        params,
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid('table[id*="ucStat"]', value.data);
          return dataGrid.extract(STATISTICS_SCHEMA, academy);
        }),
      );
  }

  fetchAll(year: string, semester: number, mode: string, academy: Academy) {
    let statMode;
    switch (mode) {
      case 'faculties':
        statMode = 'statfac';
        break;
      case 'divisions':
        statMode = 'statkaf';
        break;
    }
    return this.fetch(academy, {
      mode: statMode,
      year,
      sem: semester,
    });
  }

  fetchByDivisionId(
    id: number,
    year: string,
    semester: number,
    academy: Academy,
  ) {
    return this.fetchAll(year, semester, 'divisions', academy).pipe(
      map(statistics => {
        return statistics.find(item => item.divisionId === Number(id));
      }),
    );
  }

  fetchByFacultyId(
    id: number,
    year: string,
    semester: number,
    academy: Academy,
  ) {
    return this.fetchAll(year, semester, 'faculties', academy).pipe(
      map(statistics => {
        return statistics.find(item => item.facultyId === id);
      }),
    );
  }
}
