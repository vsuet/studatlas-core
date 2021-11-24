import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FetchGroupBooksArgs {
  @Field(type => ID, { description: 'ID группы' })
  groupId: number;

  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
