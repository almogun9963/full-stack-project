import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CartType } from '@repo/shared/cartType';

@ObjectType()
@Schema()
export class Cart implements CartType {
  @Field(() => ID)
  id?: string;

  @Field()
  @Prop()
  userId?: string;

  @Field(() => [String], { defaultValue: [] })
  @Prop()
  productsIds?: string[];
}

export const cartSchema = SchemaFactory.createForClass(Cart);
