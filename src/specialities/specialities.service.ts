import { HttpService, Injectable } from '@nestjs/common';
import { Academy } from '../academies/models/academy.model';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { SPECIALITY_SCHEMA } from './mocks/speciality-schema.mock';

@Injectable()
export class SpecialitiesService {
  constructor(private readonly httpService: HttpService) {}

  fetchAll(academy: Academy) {
    return this.httpService
      .get('/Dek/Default.aspx', {
        baseURL: academy.endpoint,
        params: {
          mode: 'spets',
        },
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid('table[id*="ucSpets"]', value.data);
          return dataGrid.extract(SPECIALITY_SCHEMA);
        }),
      );
  }
}
