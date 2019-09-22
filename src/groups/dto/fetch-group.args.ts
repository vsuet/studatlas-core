import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FetchGroupArgs {
  @Field(type => ID, { description: 'ID группы' })
  groupId: number;

  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
