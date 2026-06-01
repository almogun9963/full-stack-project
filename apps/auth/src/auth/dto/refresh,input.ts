import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class RefreshInput {
  @Field(() => ID)
  id?: string;

  @Field()
  refreshToken?: string;
}
