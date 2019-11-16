import { Field, ID, ObjectType } from 'type-graphql';
import { Group } from '../../groups/models/group.model';
import { Speciality } from '../../specialities/models/speciality.model';
import { Statistics } from '../../statistics/models/statistics.model';
import { Academy } from '../../academies/models/academy.model';

@ObjectType()
export class Faculty {
  @Field(type => ID)
  id: number;

  @Field({ description: 'Название кафедры' })
  name: string;

  @Field({ nullable: true, description: 'Сокращение' })
  abbreviation?: string;

  @Field({ nullable: true, description: 'Декан' })
  head?: string;

  @Field({ nullable: true, description: 'Телефон деканата' })
  phone?: string;

  @Field({ nullable: true, description: 'Аудитория' })
  room?: string;

  @Field(type => [Group], {
    nullable: true,
    description: 'Группы факультета',
  })
  groups?: Group[];

  @Field(type => [Speciality], {
    nullable: true,
    description: 'Специальности факультета',
  })
  specialities?: Speciality[];

  @Field(type => Statistics, {
    description: 'Статистика по факультету',
  })
  statistics: Statistics;

  academy: Academy;
}
