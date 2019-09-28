import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FetchDocumentArgs {
  @Field(type => ID, { description: 'ID ведомости' })
  id: number;
}
