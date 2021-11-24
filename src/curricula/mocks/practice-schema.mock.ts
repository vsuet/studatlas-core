export const PRACTICE_SCHEMA = {
  attributes: [
    {
      name: 'semester',
      type: 'numeric',
      columns: ['Семестр'],
    },
    {
      name: 'weeks',
      type: 'numeric',
      columns: ['Недель'],
    },
    {
      name: 'type',
      type: 'text',
      columns: ['Вид'],
    },
    {
      name: 'category',
      type: 'text',
      columns: ['Категория'],
    },
    {
      name: 'divisionId',
      type: 'numeric',
      columns: ['Код Кафедры'],
    },
  ],
};
