import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class GetSpecialityArgs {
  @Field(type => ID, { description: 'ID специальности' })
  id: number;

  @Field(type => ID, { description: 'ID вуза' })
  academyId: string;
}
