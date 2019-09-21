import * as queryString from 'query-string';
import { Schema } from '../interfaces/schema.interface';
import * as cheerio from 'cheerio';

export class DataGrid {
  private readonly $: CheerioStatic;
  private root: Cheerio;
  private headers: Cheerio;
  private rows: Cheerio;

  constructor(selectors: string, html: string) {
    this.$ = cheerio.load(html);
    this.root = this.$(selectors);
    this.headers = this.$(this.root).find('.TblHead td');
    this.rows = this.$(this.root).find('tr:not(.TblHead)');
  }

  public extract(schema: Schema) {
    const positions = {};
    schema.attributes.map(attribute => {
      positions[attribute.name] = this.headers
        .toArray()
        .findIndex((header: any) =>
          attribute.columns.includes(this.$(header).text()),
        );
    });

    return this.rows.map((i, row) => {
      const entity = {};
      const cells = this.$(row)
        .find('td')
        .toArray();

      schema.attributes.map(({ name, type }) => {
        let value;
        const elem = this.$(cells[positions[name]]);

        switch (type) {
          case 'id': {
            const stringified = elem.find('a').attr('href');
            const parsed = queryString.parse(stringified);
            value = parsed.id;
            break;
          }
          case 'text':
          default: {
            const text = elem.text().trim();
            value = !!text.length ? text : null;
          }
        }
        entity[name] = value;
      });
      return entity;
    });
  }
}
