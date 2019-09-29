import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class SubscribeBookArgs {
  @Field(type => ID, { description: 'ID зачетки' })
  bookId: number;

  @Field(type => ID, { description: 'ID вуза' })
  academyId: number;
}
