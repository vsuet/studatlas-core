import { ArgsType, Field, ID, Int } from 'type-graphql';

@ArgsType()
export class GetGroupsArgs {
  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;

  @Field(type => Int, { defaultValue: 1 })
  page?: number;
}
