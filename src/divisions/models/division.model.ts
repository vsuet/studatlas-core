import { Field, ID, ObjectType } from 'type-graphql';
import { Statistics } from '../../statistics/models/statistics.model';
import { Academy } from '../../academies/models/academy.model';

@ObjectType()
export class Division {
  @Field(type => ID)
  id: number;

  @Field({ description: 'Название кафедры' })
  name: string;

  @Field({ description: 'Сокращение' })
  abbreviation: string;

  @Field({ nullable: true, description: 'Заведующий кафедрой' })
  head?: string;

  @Field({ nullable: true, description: 'Телефон кафедры' })
  phone?: string;

  @Field({ nullable: true, description: 'Аудитория' })
  room?: string;

  @Field(type => Statistics, {
    description: 'Статистика по кафедре',
  })
  statistics: Statistics;

  academy: Academy;
}
