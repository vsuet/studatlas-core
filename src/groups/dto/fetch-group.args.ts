import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FetchGroupArgs {
  @Field(type => ID, { description: 'ID группы' })
  id: number;

  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
