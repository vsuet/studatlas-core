import { ArgsType, Field, ID } from 'type-graphql';

@ArgsType()
export class ResolveMemberPropertyArgs {
  @Field(type => ID, {
    description: 'ID зачетки',
    nullable: true,
  })
  bookId?: number;
}
