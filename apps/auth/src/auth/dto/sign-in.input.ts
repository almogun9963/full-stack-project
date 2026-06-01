import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class SignInInput {
  @Field(() => ID)
  id?: string;

  @Field()
  password?: string;
}
