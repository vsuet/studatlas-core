import { Field, ObjectType } from 'type-graphql';
import { Faculty } from './faculty.model';

@ObjectType()
export class FacultyEdge {
  @Field()
  cursor: string;

  @Field(type => Faculty)
  node: Faculty;
}
