import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  productId?: number;

  @Field()
  name?: string;

  @Field()
  price?: number;

  @Field()
  company?: string;

  @Field()
  productType?: string;
  // @Field()
  // ratings: string[];

  @Field()
  description?: string;

  @Field()
  size?: number;

  // @Field()
  // tag: string[];

  @Field()
  imageUrl?: string;

  @Field()
  sellerId?: number;
}
