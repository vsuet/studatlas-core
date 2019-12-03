import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class GetSpecialityGroupsArgs {
  @Field(type => ID, { description: 'ID специальности' })
  specialityId: number;

  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
