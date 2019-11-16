import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FetchGroupsArgs {
  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
