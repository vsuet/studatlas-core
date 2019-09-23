import { Field, ID, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class DocumentMember {
  @Field(type => ID)
  bookId: number;

  @Field()
  bookCode: string;

  @Field()
  date: string;

  @Field()
  mark: string;

  academyId: string;
}
