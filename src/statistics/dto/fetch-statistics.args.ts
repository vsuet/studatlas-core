import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class FetchStatisticsArgs {
  @Field()
  mode: 'divisions' | 'faculties';

  @Field({ description: 'Учебный год', nullable: true })
  year: string;

  @Field(type => Int, { nullable: true })
  semester: number;
}
