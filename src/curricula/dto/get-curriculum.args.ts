import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class GetCurriculumArgs {
  @Field(type => ID, { description: 'ID учебного плана' })
  id: number;
}
