import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FetchDivisionsArgs {
  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
