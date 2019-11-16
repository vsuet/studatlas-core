import { Field, ID, ObjectType } from 'type-graphql';
import { Group } from '../../groups/models/group.model';
import { Division } from '../../divisions/models/division.model';
import { Faculty } from '../../faculties/models/faculty.model';
import { Academy } from '../../academies/models/academy.model';

@ObjectType()
export class Speciality {
  @Field(type => ID)
  id: number;

  @Field({ description: 'Краткое наименование' })
  shortName: string;

  @Field({ description: 'Название' })
  name: string;

  @Field({ description: 'Шифр' })
  code: string;

  @Field({ nullable: true, description: 'Квалификация' })
  qualification?: string;

  @Field(type => [Group], {
    nullable: true,
    description: 'Группы, обучающиеся по этой специальности',
  })
  groups?: Group[];

  @Field(type => Division, {
    nullable: true,
    description: 'Кафедра, к которой относится специальность (если есть)',
  })
  division?: Division;

  @Field(type => Faculty, {
    description: 'Факультет, к которому относится специальность',
  })
  faculty: Faculty;

  academy: Academy;
  divisionId?: number;

  facultyId: number;
}
