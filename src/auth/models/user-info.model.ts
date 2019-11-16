import { Field, ObjectType } from 'type-graphql';
import { AppMetadata, User, UserMetadata } from 'auth0';

@ObjectType()
export class UserInfo implements User<AppMetadata, UserMetadata> {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true, name: 'isVerified' })
  'email_verified'?: boolean;

  @Field({ nullable: true })
  picture?: string;

  @Field({ nullable: true, name: 'createdAt' })
  'created_at'?: string;
}
