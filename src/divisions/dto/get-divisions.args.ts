import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class GetDivisionsArgs {
  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
