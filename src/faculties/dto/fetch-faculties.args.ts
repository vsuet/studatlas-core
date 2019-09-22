import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FetchFacultiesArgs {
  @Field(type => ID)
  academyId: string;
}
