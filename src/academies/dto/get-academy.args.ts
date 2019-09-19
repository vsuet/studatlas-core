import { IsString } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class GetAcademyArgs {
  @IsString()
  @Field()
  academyId: string;
}
