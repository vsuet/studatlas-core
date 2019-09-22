import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FetchSpecialityArgs {
  @Field(type => ID, { description: 'ID специальности' })
  specialityId: number;

  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
