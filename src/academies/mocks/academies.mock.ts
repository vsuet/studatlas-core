import { Academy } from '../interfaces/academy.interface';

export const ACADEMIES: Academy[] = [
  {
    id: 'sibadi',
    name: 'Сибирский государственный автомобильно-дорожный университет',
    abbreviation: 'СибАДИ',
    website: 'https://sibadi.org/',
    endpoint: 'http://umu.sibadi.org',
  },
  {
    id: 'nsma',
    name: 'Государственный морской Университет имени адмирала Ф.Ф. Ушакова',
    abbreviation: 'ГМУ имени адмирала Ф.Ф.Ушакова',
    website: 'http://www.aumsu.ru/',
    endpoint: 'http://nsma.ru:777',
  },
  {
    id: 'gturp',
    name: 'Высшая школа технологии и энергетики',
    abbreviation: 'ВШТЭ СПбГУПТД',
    website: 'https://gturp.spb.ru/',
    endpoint: 'http://188.134.16.135/',
  }
];
