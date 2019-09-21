import { Field, ID, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Division {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  abbreviation: string;

  @Field({ nullable: true })
  head?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  room?: string;
}
