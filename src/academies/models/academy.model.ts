import { Field, ID, ObjectType } from 'type-graphql';
import { Faculty } from '../../faculties/models/faculty.model';
import { Group } from '../../groups/models/group.model';
import { Division } from '../../divisions/models/division.model';
import { Speciality } from '../../specialities/models/speciality.model';
import { Statistics } from '../../statistics/models/statistics.model';

@ObjectType()
export class Academy {
  @Field(type => ID)
  id: string;

  @Field()
  alias: string;

  @Field()
  name: string;

  @Field()
  abbreviation: string;

  @Field()
  website: string;

  @Field()
  endpoint: string;

  @Field()
  version?: string;

  @Field(type => [Faculty], { nullable: true })
  faculties?: Faculty[];

  @Field(type => [Group], { nullable: true })
  groups?: Group[];

  @Field(type => [Division], { nullable: true })
  divisions?: Division[];

  @Field(type => [Speciality], { nullable: true })
  specialities?: Speciality[];

  @Field(type => [Statistics], { nullable: true })
  statistics?: Statistics[];
}
