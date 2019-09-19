import { HttpService, Injectable } from '@nestjs/common';
import { AcademiesService } from '../academies/academies.service';
import { Academy } from '../academies/entities/academy.entity';
import { map } from 'rxjs/operators';
import { Iconv } from 'iconv';

const iconv = new Iconv('CP1251', 'UTF-8');
import * as HTMLParser from 'node-html-parser';
import { DataGrid } from '../grabber/classes/data-grid.class';
import { Faculty } from './interfaces/faculty.interface';

const FACULTY_SCHEMA = {
  attributes: [
    {
      name: 'id',
      columns: ['Факультет'],
    },
    {
      name: 'name',
      columns: ['Факультет'],
    },
    {
      name: 'abbreviation',
      columns: ['Сокращение'],
    },
    {
      name: 'head',
      columns: ['Декан'],
    },
    {
      name: 'phone',
      columns: ['Телефон'],
    },
    {
      name: 'room',
      columns: ['Аудитория'],
    },
  ],
};

@Injectable()
export class FacultiesService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(academy: Academy) {
    console.log({ academy });
    return this.httpService
      .get('/Dek/Default.aspx', {
        baseURL: academy.endpoint,
      })
      .pipe(
        map(value => {
          const document = HTMLParser.parse(value.data) as any;
          const table = document.querySelector(
            '#ctl00_ContentPage_ucFacultets_Grid',
          );

          const dataGrid = new DataGrid(table);
          const faculties = dataGrid.extract(FACULTY_SCHEMA);
          console.log(faculties)

          // const headers = table.querySelectorAll('.TblHead td');
          // const rows = table
          //   .querySelectorAll('tr')
          //   .map(row => row.querySelectorAll('td'));
          // delete rows[0];
          //
          // const positions = {};
          // FACULTY_SCHEMA.attributes.map(attribute => {
          //   positions[attribute.name] = headers.findIndex(h => {
          //     return h.text === attribute.columns[0];
          //   });
          // });
          //
          // console.log(
          //   // headers.map(h => h.text),
          //   // rows.map(row => row.querySelectorAll('td').map(td => td.text)),
          //   positions,
          // );
          //
          // const yyy = rows.map(row => {
          //   const xxx = {};
          //   FACULTY_SCHEMA.attributes.map(attribute => {
          //     xxx[attribute.name] = row[positions[attribute.name]].text;
          //   });
          //   return xxx;
          // });
          //
          // console.log(yyy);

          return faculties;
        }),
      );
  }
}
