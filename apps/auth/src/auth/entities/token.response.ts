import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TokenResponse {
  @Field(() => String, { nullable: true })
  access_token?: string;
  @Field(() => String, { nullable: true })
  refresh_token?: string;
}
