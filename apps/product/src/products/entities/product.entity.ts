import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProductType, Tag } from "@repo/common-types";
@ObjectType()
@Schema()
export class Product implements ProductType {
  @Field(() => ID)
  id?: string;

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

  @Field(() => [Number])
  @Prop({ type: [Number], default: [] })
  ratings?: number[];

  @Field()
  @Prop()
  description?: string;

  @Field()
  @Prop()
  size?: string;

  @Field(() => [Tag])
  @Prop({ type: [String], enum: Tag, default: [Tag.Budget] })
  tags?: Tag[];

  @Field()
  @Prop()
  imageUrl?: string;

  @Field()
  @Prop()
  isAvailable?: boolean;

  @Field()
  @Prop()
  catagory?: string;
}

export const productSchema = SchemaFactory.createForClass(Product);
