import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class GetFacultyArgs {
  @Field(type => ID, { description: 'ID факультета' })
  id: number;

  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
