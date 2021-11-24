import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class GetDivisionArgs {
  @Field(type => ID, { description: 'ID кафедры' })
  id: number;

  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
