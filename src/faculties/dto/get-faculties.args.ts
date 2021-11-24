import { ArgsType, ID, Int, Field } from 'type-graphql';

@ArgsType()
export class GetFacultiesArgs {
  @Field(type => ID)
  academyId: string;

  @Field(type => Int, {
    nullable: true,
    defaultValue: 10,
  })
  first: number;

  @Field(type => ID, {
    nullable: true,
  })
  after: string;
}
