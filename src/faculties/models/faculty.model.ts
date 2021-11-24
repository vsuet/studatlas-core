import { Field, ID, ObjectType } from 'type-graphql';

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
}
