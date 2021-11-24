import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class SearchAcademiesArgs {
  @Field()
  term: string;
}
