import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { OrderType } from "@repo/common-types";

@ObjectType()
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Order implements OrderType {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop()
  cartId: string;

  @Field()
  @Prop()
  userId: string;

  @Field(() => Date)
  @Prop()
  createdAt: Date;

  @Field(() => Date)
  @Prop()
  updatedAt: Date;
}

export const orderSchema = SchemaFactory.createForClass(Order);
orderSchema.set("toObject", { virtuals: true });
orderSchema.set("toJSON", { virtuals: true });
orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
