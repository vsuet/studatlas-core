import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Academy {
  @Field(type => ID)
  id: string;

  @Field()
  alias: string;

  @Field()
  name: string;

  @Field()
  abbreviation: string;

  @Field()
  website: string;

  @Field()
  endpoint: string;

  @Field()
  version?: string;
}
