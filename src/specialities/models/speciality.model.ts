import { Field, ID, ObjectType } from 'type-graphql';
import { Group } from '../../groups/models/group.model';
import { Division } from '../../divisions/models/division.model';
import { Faculty } from '../../faculties/models/faculty.model';

@ObjectType()
export class Speciality {
  @Field(type => ID)
  id: string;

  @Field()
  shortName: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field({ nullable: true })
  qualification?: string;

  @Field(type => [Group], { nullable: true })
  groups?: Group[];

  @Field(type => Division, { nullable: true })
  division?: Division;

  @Field(type => Faculty)
  faculty: Faculty;

  academyId: string;

  divisionId?: number;

  facultyId: number;
}
