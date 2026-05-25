import { CreateProductDto } from './create-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductDto) {
  @Field(() => Int)
  productId?: number;
}
