import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FetchCurriculumArgs {
  @Field(type => ID, { description: 'ID учебного плана' })
  id: number;
}
