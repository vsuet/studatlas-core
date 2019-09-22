import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FetchDivisionArgs {
  @Field(type => ID, { description: 'ID кафедры' })
  divisionId: number;

  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
