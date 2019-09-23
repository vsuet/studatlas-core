import { Field, ID, ObjectType, Int } from 'type-graphql';
import { DocumentMember } from './document-member.model';

@ObjectType()
export class Document {
  @Field(type => ID, { nullable: true })
  id: string;

  @Field()
  unit: string;

  @Field()
  year: string;

  @Field(type => Int)
  yearNumber: string;

  @Field(type => [DocumentMember], { nullable: true })
  members?: DocumentMember[];

  academyId: string;
}
