import { Field, Int, ObjectType } from 'type-graphql';
import { PageInfo } from './page-info.model';
import { FacultyEdge } from './faculty-edge.model';

@ObjectType()
export class FacultyConnection {
  @Field(type => Int)
  totalCount: number;

  @Field(type => PageInfo)
  pageInfo: PageInfo;

  @Field(type => FacultyEdge, { nullable: true })
  edges: [FacultyEdge];
}
