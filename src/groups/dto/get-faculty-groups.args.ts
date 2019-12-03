import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class GetFacultyGroupsArgs {
  @Field(type => ID, { description: 'ID факультета' })
  facultyId: number;

  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
