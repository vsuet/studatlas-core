import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Faculty {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  abbreviation?: string;

  @Field({ nullable: true })
  head?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  room?: string;
}
