import { Field, ID, ObjectType } from 'type-graphql';
import { Faculty } from '../../faculties/entities/Faculty.entity';

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
}
