import { Field, InputType, Float } from "@nestjs/graphql";

@InputType()
export class RangeInput {
  @Field(() => Float, { nullable: true })
  from?: number;

  @Field(() => Float, { nullable: true })
  to?: number;
}
