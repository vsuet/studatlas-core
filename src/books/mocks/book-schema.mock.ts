import { Schema } from '../../grabber/interfaces/schema.interface';

export const BOOK_SCHEMA: Schema = {
  attributes: [
    {
      name: 'id',
      type: 'id',
      columns: ['Номер Зачетной Книжки'], // институт для СПбГЛТУ и КГУ
    },
    {
      name: 'code',
      type: 'text',
      columns: ['Номер Зачетной Книжки'], // институт для СПбГЛТУ и КГУ
    },
  ],
};
