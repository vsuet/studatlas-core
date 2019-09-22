import { Field, ID, ObjectType } from 'type-graphql';
import { Group } from '../../groups/models/group.model';

@ObjectType()
export class Book {
  @Field(type => ID)
  id: string;

  @Field({ description: 'Название зачетной книжки' })
  code: string;

  @Field(type => Group, { description: 'Группа, в которой учится студент' })
  group: Group;

  academyId: string;
  groupId: number;
}
