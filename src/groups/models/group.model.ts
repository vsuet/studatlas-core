import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Speciality } from '../../specialities/models/speciality.model';

@ObjectType()
export class Group {
  @Field(type => ID)
  id: number;

  @Field()
  name: string;

  @Field(type => Int)
  year: number;

  @Field(type => Int)
  countAll: number;

  @Field(type => Int)
  countCommon: number;

  @Field(type => Int)
  countTargeted: number;

  @Field(type => Int)
  countSpecial: number;

  @Field({ nullable: true })
  curricula?: string;

  @Field(type => Speciality)
  speciality: Speciality;

  academyId: string;

  specialityId?: number;
}
