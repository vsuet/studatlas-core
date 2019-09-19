import { Schema } from '../interfaces/schema.interface';

export class DataGrid {
  private document: HTMLElement;
  private headers: HTMLElement[] = [];
  private rows: HTMLTableRowElement[];

  constructor(document: HTMLElement) {
    this.document = document;
    this.initHeaders();
    this.initRows();
  }

  protected initHeaders() {
    this.headers = Array.from(this.document.querySelectorAll('.TblHead td'));
  }

  protected initRows() {
    const rows = Array.from(this.document.querySelectorAll('tr'));
    rows.shift();
    this.rows = rows;
  }

  public extract(schema: Schema) {
    const positions = {};
    schema.attributes.map(attribute => {
      positions[attribute.name] = Array.from(this.headers).findIndex(
        (header: any) => attribute.columns.includes(header.text),
      );
    });
    return Array.from(this.rows).map(row => {
      const entity = {};
      const cells = Array.from(row.querySelectorAll('td')) as any;
      Object.keys(positions).map(attribute => {
        entity[attribute] = cells[positions[attribute]].text;
      });
      return entity;
    });
  }
}
