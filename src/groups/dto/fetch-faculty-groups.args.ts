import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FetchFacultyGroupsArgs {
  @Field(type => ID, { description: 'ID факультета' })
  facultyId: number;

  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
