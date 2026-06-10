import { InputType, Field, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class RefreshInput {
  @Field(() => ID)
  id?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  refreshToken?: string;
}
