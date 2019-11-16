import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FetchSpecialitiesArgs {
  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
