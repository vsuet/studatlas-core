import { Field, ID, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Division {
  @Field(type => ID)
  id: string;

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

  academyId: string;
}
