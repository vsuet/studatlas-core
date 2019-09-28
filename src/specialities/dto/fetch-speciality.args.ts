import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FetchSpecialityArgs {
  @Field(type => ID, { description: 'ID специальности' })
  id: number;
}
