import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProductType, Tag } from "@repo/common-types";
@ObjectType()
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class ProductInsideCart implements ProductType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  company: string;

  @Field()
  productType: string;

  @Field(() => [Number])
  ratings: number[];

  @Field()
  description: string;

  @Field()
  size: string;

  @Field(() => [Tag])
  tags: Tag[];

  @Field()
  imageUrl: string;

  @Field()
  @Prop()
  isAvailable: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const productSchema = SchemaFactory.createForClass(ProductInsideCart);
productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });
productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
