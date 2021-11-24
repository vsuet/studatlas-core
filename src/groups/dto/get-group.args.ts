import { ArgsType, Field, ID, Int } from 'type-graphql';

@ArgsType()
export class GetGroupArgs {
  @Field(type => ID, { description: 'ID группы' })
  id: number;

  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
