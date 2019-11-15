import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class PageInfo {
  @Field(type => Int, { nullable: true })
  lastCursor: number;

  @Field()
  hasNextPage: boolean;
}
