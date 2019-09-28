import { Field, ID, ObjectType, Int } from 'type-graphql';
import { DocumentMember } from './document-member.model';
import { Division } from '../../divisions/models/division.model';
import { Group } from '../../groups/models/group.model';
import { SaveStory } from './save-story.model';
import { Academy } from '../../academies/models/academy.model';

@ObjectType()
export class Document {
  @Field(type => ID, { nullable: true })
  id: number;

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

  // кафедру могут удалить поэтому может быть null
  @Field(type => Division, { nullable: true })
  division: Division;

  @Field(type => Int, { description: 'Кафедра' })
  divisionId: number;

  @Field({ description: 'Кафедра' })
  divisionName: string;

  // группу могут удалить поэтому может быть null
  @Field(type => Group, { nullable: true })
  group: Group;

  @Field(type => Int, { description: 'Группа' })
  groupId: number;

  @Field({ description: 'Группа' })
  groupName: string;

  @Field(type => [DocumentMember], { nullable: true })
  members?: DocumentMember[];

  @Field(type => [SaveStory], { nullable: true })
  saveStories?: SaveStory[];

  academy: Academy;
}
