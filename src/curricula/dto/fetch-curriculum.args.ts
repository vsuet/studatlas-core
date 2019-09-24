import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FetchCurriculumArgs {
  @Field(type => ID, { description: 'ID учебного плана' })
  curriculumId: number;

  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
