import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderType } from '@repo/shared/orderType';

@ObjectType()
@Schema()
export class Order implements OrderType {
  @Field(() => ID)
  id?: string;

  @Field()
  @Prop()
  cartId?: string;

  @Field()
  @Prop()
  userId?: string;
}

export const orderSchema = SchemaFactory.createForClass(Order);
