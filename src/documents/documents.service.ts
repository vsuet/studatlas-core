import { Injectable } from '@nestjs/common';
import { GrabberService } from '../grabber/grabber.service';
import { map } from 'rxjs/operators';
import * as cheerio from 'cheerio';
import { Schema } from '../grabber/interfaces/schema.interface';
import * as queryString from 'query-string';

const DOCUMENT_HEADER_SCHEMA: Schema = {
  attributes: [
    {
      name: 'groupId',
      columns: ['Группа'],
      type: 'id',
    },
    {
      name: 'unit',
      columns: ['Блок'],
      type: 'text',
    },
    {
      name: 'divisionId',
      columns: ['Кафедра'],
      type: 'id',
    },
    {
      name: 'year',
      columns: ['Год контроля'],
      type: 'text',
    },
    {
      name: 'yearNumber',
      columns: ['Курс'],
      type: 'numeric',
    },
    {
      name: 'teacher',
      columns: ['Преподаватель'],
      type: 'text',
    },
    {
      name: 'semester',
      columns: ['Семестр'],
      type: 'numeric',
    },
    {
      name: 'hours',
      columns: ['Часов'],
      type: 'numeric',
    },
    {
      name: 'subject',
      columns: ['Дисциплина'],
      type: 'text',
    },
    {
      name: 'type',
      columns: ['Тип Ведомости'],
      type: 'text',
    },
    {
      name: 'savesCount',
      columns: ['Кол-во Сохранений'],
      type: 'numeric',
    },
    {
      name: 'curricula',
      columns: ['Учебный План'],
      type: 'text',
    },
    {
      name: 'status',
      columns: ['Статус'],
      type: 'text',
    },
    {
      name: 'updatedAt',
      columns: ['Дата Изменения'],
      type: 'text',
    },
    {
      name: 'device',
      columns: ['Компьютер'],
      type: 'text',
    },
  ],
};

@Injectable()
export class DocumentsService {
  constructor(private readonly grabberService: GrabberService) {}

  fetch(academyId: string, params?: any) {
    return this.grabberService
      .createClient(academyId)
      .get('/Ved/Ved.aspx', {
        params,
      })
      .pipe(
        map(value => {
          const $ = cheerio.load(value.data);
          const headerRoot = $('#tblTitle');
          const membersRoot = $('#ucVedBox_tblVed');
          const headerCells = $(headerRoot)
            .find('tr')
            .not('.TitleVedName')
            .find('td')
            .toArray();

          const headers = headerCells
            .filter((cell, i) => i % 2 === 0)
            .map(header =>
              $(header)
                .text()
                .trim(),
            );
          const values = headerCells.filter((cell, i) => i % 2 !== 0);

          const headersPositions = {};

          DOCUMENT_HEADER_SCHEMA.attributes.map(({ name, columns }) => {
            headersPositions[name] = headers
              // ищет колонку где искать аттрибут и возвращает ее индекс
              .findIndex(header => {
                return columns.includes(header);
              });
          });

          const entity = {};

          DOCUMENT_HEADER_SCHEMA.attributes.map(({ name, type }) => {
            const cell = $(values[headersPositions[name]]);
            let entityValue;

            switch (type) {
              case 'id': {
                const stringified = cell.find('a').attr('href');
                const parsed = queryString.parse(stringified, {
                  parseNumbers: true,
                });
                entityValue = parsed.id || parsed['Ved.aspx?id'];
                break;
              }
              case 'numeric': {
                entityValue = Number(cell.text().trim());
                break;
              }
              case 'text':
              default: {
                entityValue = cell.text().trim();
                break;
              }
            }

            entity[name] = entityValue;
          });

          console.log(entity);

          return Object.assign(entity, {
            id: params.documentId,
          });
        }),
      );
  }

  fetchById({ academyId, documentId }) {
    return this.fetch(academyId, { id: documentId });
  }
}
