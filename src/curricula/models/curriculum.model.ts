import { Field, ID, ObjectType } from 'type-graphql';
import { Practice } from './practice.model';
import { Academy } from '../../academies/models/academy.model';

@ObjectType()
export class Curriculum {
  @Field(type => ID)
  id: string;

  @Field({ description: 'Название учебного плана' })
  name: string;

  @Field({ description: 'Краткое описание учебного плана' })
  description: string;

  @Field(type => [Practice], {
    description: 'Практики',
  })
  practices: Practice[];

  academy: Academy;
}
