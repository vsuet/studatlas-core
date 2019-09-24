import { Injectable } from '@nestjs/common';
import { GrabberService } from '../grabber/grabber.service';
import { map } from 'rxjs/operators';
import * as cheerio from 'cheerio';
import * as queryString from 'query-string';
import { PRACTICE_SCHEMA } from './mocks/practice-schema.mock';

@Injectable()
export class CurriculaService {
  constructor(private readonly grabberService: GrabberService) {}

  fetch(academyId: string, params?: any) {
    return this.grabberService
      .createClient(academyId)
      .get('/Plans/Plan.aspx', {
        params,
      })
      .pipe(
        map(value => {
          const $ = cheerio.load(value.data);

          const name = $('#lblPlanName')
            .text()
            .trim();
          const description = $('#lblSpets')
            .text()
            .trim();

          const practicesRoot = $('#divPr');
          const practicesTable = $(practicesRoot)
            .find('table')
            .eq(0);

          const practisesColumns = $(practicesTable)
            .find('th')
            .toArray();

          const practisesRows = $(practicesTable)
            .find('tr')
            .toArray();
          practisesRows.shift();

          const practicesPositions = {};
          PRACTICE_SCHEMA.attributes.map(attribute => {
            practicesPositions[attribute.name] = practisesColumns
              // ищет колонку где искать аттрибут и возвращает ее индекс
              .findIndex((header: any) => {
                const headerText = $(header)
                  .text()
                  .trim();
                return attribute.columns.includes(headerText);
              });
          });

          const practices = practisesRows.map(row => {
            const entity = {};
            const cells = $(row)
              .find('td')
              .toArray();

            PRACTICE_SCHEMA.attributes.map(attribute => {
              let practiceValue;
              const elem = $(cells[practicesPositions[attribute.name]]);

              switch (attribute.type) {
                case 'id': {
                  const stringified = elem
                    .find('a')
                    .attr('href')
                    .split('?', 2)
                    .pop();
                  const parsed = queryString.parse(stringified, {
                    parseNumbers: true,
                  });
                  practiceValue = parsed.id;
                  break;
                }
                case 'numeric': {
                  const numVal = elem.text().trim();
                  practiceValue = !!numVal.length ? Number(numVal) : null;
                  break;
                }
                case 'text':
                default: {
                  const text = elem.text().trim();
                  practiceValue = !!text.length ? text : null;
                }
              }
              entity[attribute.name] = practiceValue;
            });
            return { ...entity, academyId };
          });

          return { id: params.id, name, description, practices };
        }),
      );
  }

  fetchById({ academyId, curriculumId }) {
    return this.fetch(academyId, { id: curriculumId });
  }
}
