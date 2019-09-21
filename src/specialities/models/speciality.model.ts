import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Speciality {
  @Field(type => ID)
  id: string;

  @Field()
  shortName: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field({ nullable: true })
  qualification?: string;
}
