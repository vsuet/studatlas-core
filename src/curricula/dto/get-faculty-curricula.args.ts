import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class GetFacultyCurriculaArgs {
  @Field(type => ID, { description: 'ID факультета' })
  facultyId: number;

  @Field(type => ID, { description: 'ID учебного плана' })
  academyId: string;

  @Field({ description: 'ID учебного плана', nullable: true })
  years: string;
}
