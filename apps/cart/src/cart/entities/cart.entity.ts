import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CartType } from "@repo/common-types";
import { ProductInsideCart } from "./product.entity";

@ObjectType()
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Cart implements CartType {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop()
  userId: string;

  @Field(() => [String], { defaultValue: [] })
  @Prop()
  productsIds: string[];

  @Field(() => [ProductInsideCart], { defaultValue: [] })
  products: ProductInsideCart[];

  @Field(() => Date, { nullable: true })
  @Prop()
  deletedAt: Date;

  @Field(() => Date)
  @Prop()
  createdAt: Date;

  @Field(() => Date)
  @Prop()
  updatedAt: Date;
}

export const cartSchema = SchemaFactory.createForClass(Cart);
cartSchema.set("toObject", { virtuals: true });
cartSchema.set("toJSON", { virtuals: true });
cartSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
