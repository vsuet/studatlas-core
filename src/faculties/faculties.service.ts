import { HttpService, Injectable } from '@nestjs/common';
import { Academy } from '../academies/entities/academy.entity';
import { map } from 'rxjs/operators';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { Schema } from '../grabber/interfaces/schema.interface';

const FACULTY_SCHEMA: Schema = {
  attributes: [
    {
      name: 'id',
      type: 'id',
      columns: ['Факультет'],
    },
    {
      name: 'name',
      type: 'text',
      columns: ['Факультет'],
    },
    {
      name: 'abbreviation',
      type: 'text',
      columns: ['Сокращение'],
    },
    {
      name: 'head',
      type: 'text',
      columns: ['Декан'],
    },
    {
      name: 'phone',
      type: 'text',
      columns: ['Телефон'],
    },
    {
      name: 'room',
      type: 'text',
      columns: ['Аудитория'],
    },
  ],
};

@Injectable()
export class FacultiesService {
  constructor(private readonly httpService: HttpService) {}

  async fetchAll(academy: Academy) {
    return this.httpService
      .get('/Dek/Default.aspx', {
        baseURL: academy.endpoint,
      })
      .pipe(
        map(value => {
          const dataGrid = new DataGrid(
            '[id*="ContentPage_ucFacultets_Grid"]',
            value.data,
          );
          return dataGrid.extract(FACULTY_SCHEMA);
        }),
      );
  }
}
