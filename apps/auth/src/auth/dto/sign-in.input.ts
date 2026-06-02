import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SignInInput {
  @Field(() => ID)
  id?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password?: string;
}
