import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class Entry {
  @Field(type => Int, { description: 'Семестр' })
  semester: number;

  @Field({ description: 'Дисциплина' })
  subject: string;

  @Field({ description: 'Оценка' })
  mark: string;

  @Field(type => Int, { description: 'Часов' })
  hours: number;

  @Field({ description: 'Преподаватель', nullable: true })
  teacher?: string;

  @Field({ description: 'Блок' })
  unit: string;

  @Field({ description: 'Тип' })
  type: string;

  academyId: string;
  bookId: number;
}
