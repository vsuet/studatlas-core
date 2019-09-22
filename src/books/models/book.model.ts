import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Book {
  @Field(type => ID)
  id: string;

  @Field({ description: 'Название зачетной книжки' })
  code: string;

  academyId: string;
}
