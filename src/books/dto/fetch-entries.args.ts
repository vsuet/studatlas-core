import { ArgsType, Field, Int, ID } from 'type-graphql';

@ArgsType()
export class FetchEntriesArgs {
  @Field(type => ID, { description: 'ID зачетки' })
  id: number;

  @Field(type => Int, {
    description: 'Семестр',
    nullable: true,
  })
  semester?: number;

  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
