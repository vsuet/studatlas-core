import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Speciality } from '../../specialities/models/speciality.model';

@ObjectType()
export class Group {
  @Field(type => ID)
  id: number;

  @Field({ description: 'Название группы' })
  name: string;

  @Field(type => Int, { description: 'Курс' })
  year: number;

  @Field(type => Int, { description: 'Всего студентов' })
  countAll: number;

  @Field(type => Int, { description: 'На общих основаниях' })
  countCommon: number;

  @Field(type => Int, { description: 'Целевики' })
  countTargeted: number;

  @Field(type => Int, { description: 'Внеплановый прием' })
  countSpecial: number;

  @Field({ nullable: true, description: 'Учебный план группы' })
  curricula?: string;

  @Field(type => Speciality, {
    nullable: true,
    description: 'Специальность группы',
  })
  speciality: Speciality;

  academyId: string;

  specialityId?: number;
}
