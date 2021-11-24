import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class FetchSpecialityGroupsArgs {
  @Field(type => ID, { description: 'ID специальности' })
  specialityId: number;

  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
