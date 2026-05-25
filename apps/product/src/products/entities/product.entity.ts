import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class Product {
  @Field(() => ID)
  @Prop({ type: Number, unique: true, required: true })
  productId?: number;

  @Prop()
  @Field()
  name?: string;

  @Field()
  @Prop()
  price?: number;

  @Field()
  @Prop()
  company?: string;

  @Field()
  @Prop()
  productType?: string;

  // @Field()
  // @Prop()
  // ratings?: string[];

  @Field()
  @Prop()
  description?: string;

  @Field()
  @Prop()
  size?: number;

  // @Field()
  // @Prop()
  // tags?: string[];

  @Field()
  @Prop()
  imageUrl?: string;

  @Field()
  @Prop()
  sellerId?: number;
}

export const productSchema = SchemaFactory.createForClass(Product);
