import { InputType, Field } from "@nestjs/graphql";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
} from "class-validator";
import { Tag } from "@repo/common-types";

@InputType()
export class CreateProductDto {
  @Field()
  @IsString()
  name?: string;

  @Field()
  @IsNumber()
  price?: number;

  @Field()
  @IsString()
  company?: string;

  @Field()
  @IsString()
  productType?: string;

  @Field(() => [Number])
  @IsArray()
  ratings?: number[];

  @Field()
  @IsString()
  description?: string;

  @Field()
  @IsString()
  size?: string;

  @Field(() => [Tag])
  @IsArray()
  @IsEnum(Tag, { each: true })
  tags?: Tag[];

  @Field()
  @IsString()
  imageUrl?: string;

  @Field()
  @IsBoolean()
  isAvailable?: boolean;

  @Field()
  @IsString()
  catagory?: string;
}
