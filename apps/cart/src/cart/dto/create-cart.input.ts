import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';
@InputType()
export class CreateCartInput {
  @Field()
  @IsString()
  userId?: string;

  @Field(() => [String], { defaultValue: [] })
  @IsArray()
  @IsString({ each: true })
  productsIds?: string[];
}
