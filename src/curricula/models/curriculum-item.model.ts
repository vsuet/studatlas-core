import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class CurriculumItem {
  @Field(type => ID)
  id: number;

  @Field({ description: 'Название учебного плана' })
  name: string;

  @Field({ description: 'Краткое описание учебного плана' })
  speciality: string;
}
