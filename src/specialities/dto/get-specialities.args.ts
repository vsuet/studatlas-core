import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class GetSpecialitiesArgs {
  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
