import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FetchBookArgs {
  @Field(type => ID, { description: 'ID зачетки' })
  id: number;

  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
