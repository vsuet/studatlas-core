import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class EntriesFilterArgs {
  @Field(type => Int, {
    description: 'Семестр',
    nullable: true,
  })
  semester?: number;
}
