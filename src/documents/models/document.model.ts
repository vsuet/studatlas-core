import { Field, ID, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class Document {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field()
  unit: string;

  @Field()
  year: string;

  @Field(type => Int)
  yearNumber: string;

  academyId: string;
}
