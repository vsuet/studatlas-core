import { HttpService, Injectable } from '@nestjs/common';
import { Academy } from '../academies/models/academy.model';
import { catchError, map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { FACULTY_SCHEMA } from './mocks/faculty-schema.mock';

@Injectable()
export class FacultiesService {
  constructor(private readonly httpService: HttpService) {}

  fetchAll(academy: Academy) {
    return this.httpService
      .get('/Dek/Default.aspx', {
        baseURL: academy.endpoint,
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid(
            'table[id*="ucFacultets"]',
            value.data,
          );
          return dataGrid.extract(FACULTY_SCHEMA);
        }),
      );
  }
}
