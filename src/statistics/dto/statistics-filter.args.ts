import { ArgsType, Field, Int, ID } from 'type-graphql';

@ArgsType()
export class StatisticsFilterArgs {
  @Field({ description: 'Учебный год', nullable: true })
  year: string;

  @Field(type => Int, { nullable: true })
  semester: number;
}
