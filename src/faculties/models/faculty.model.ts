import { Field, ID, ObjectType } from 'type-graphql';
import { Group } from '../../groups/models/group.model';

@ObjectType()
export class Faculty {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  abbreviation?: string;

  @Field({ nullable: true })
  head?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  room?: string;

  @Field(type => [Group], { nullable: true })
  groups?: Group[];

  @Field()
  academyId?: string;
}
