import { Field, Int, ObjectType } from 'type-graphql';
import { Division } from '../../divisions/models/division.model';
import { Academy } from '../../academies/models/academy.model';

@ObjectType()
export class Practice {
  @Field(type => Int, { description: 'Семестр' })
  semester: number;

  @Field(type => Int, { description: 'Недель' })
  weeks: number;

  @Field({ description: 'Вид' })
  type: string;

  @Field({ description: 'Категория' })
  category: string;

  @Field(type => Int, { description: 'Код кафедры' })
  divisionId: number;

  @Field(type => Division, {
    description: 'Кафедра',
    nullable: true,
  })
  division?: Division;

  academy: Academy;
}
