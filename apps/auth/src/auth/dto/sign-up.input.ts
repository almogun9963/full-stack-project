import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString, Matches } from "class-validator";
import { IsUnique } from "../../utils/is.unique.decorator";

@InputType()
export class SignUpInput {
  @Field()
  @IsString()
  @IsUnique()
  @IsNotEmpty()
  userName!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
    {
      message:
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
    },
  )
  password!: string;
}
