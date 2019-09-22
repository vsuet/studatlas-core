import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FetchFacultyArgs {
  @Field(type => ID, { description: 'ID факультета' })
  facultyId: number;

  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
