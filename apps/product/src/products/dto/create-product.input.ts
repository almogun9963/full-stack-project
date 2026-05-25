import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateProductDto {
  @Field()
  @IsNumber()
  productId?: number;

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

  // @Field()
  // ratings?: string[];

  @Field()
  @IsString()
  description?: string;

  @Field()
  @IsNumber()
  size?: number;

  // @Field()
  // tags?: string[];

  @Field()
  @IsString()
  imageUrl?: string;

  @Field()
  @IsNumber()
  sellerId?: number;
}
