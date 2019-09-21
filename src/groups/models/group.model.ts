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
  countCommon: number;

  @Field(type => Int)
  countTargeted: number;

  @Field(type => Int)
  countSpecial: number;

  @Field({ nullable: true })
  curricula?: string;
}
