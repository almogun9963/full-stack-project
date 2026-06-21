import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class TokenResponse {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  userName: string;
  @Field(() => String, { nullable: true })
  accessToken: string;
  @Field(() => String, { nullable: true })
  refreshToken: string;
}
