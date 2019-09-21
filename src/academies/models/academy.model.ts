import { Field, ID, ObjectType } from 'type-graphql';
import { Faculty } from '../../faculties/models/faculty.model';
import { Group } from '../../groups/models/group.model';

@ObjectType()
export class Academy {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  abbreviation: string;

  @Field()
  website: string;

  @Field()
  endpoint: string;

  @Field(type => [Faculty], { nullable: true })
  faculties?: Faculty[];

  @Field(type => [Group], { nullable: true })
  groups?: Faculty[];
}
