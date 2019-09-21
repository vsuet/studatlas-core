import { Field, ID, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Group {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field(type => Int)
  year: number;

  @Field(type => Int)
  countAll: number;

  @Field(type => Int)
  countCommon: string;

  @Field(type => Int)
  countSpecial: string;

  @Field()
  curricula?: string;
}
