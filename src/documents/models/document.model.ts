import { Field, ID, ObjectType, Int } from 'type-graphql';
import { DocumentMember } from './document-member.model';

@ObjectType()
export class Document {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field({ description: 'Блок' })
  unit: string;

  @Field({ description: 'Год контроля' })
  year: string;

  @Field(type => Int, { description: 'Курс' })
  yearNumber: string;

  @Field({ description: 'Преподаватель' })
  teacher: string;

  @Field(type => Int, { description: 'Семестр' })
  semester: number;

  @Field(type => Int, { description: 'Часов' })
  hours: number;

  @Field({ description: 'Дисциплина' })
  subject: string;

  @Field({ description: 'Тип ведомости' })
  type: string;

  @Field({ description: 'Кол-во сохранений' })
  savesCount: number;

  @Field({ description: 'Учебный план' })
  curricula: string;

  @Field({ description: 'Статус' })
  status: string;

  @Field({ description: 'Дата изменения' })
  updatedAt: string;

  @Field({ description: 'Компьютер' })
  device: string;

  @Field(type => [DocumentMember], { nullable: true })
  members?: DocumentMember[];

  academyId: string;
}
