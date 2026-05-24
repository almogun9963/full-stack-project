import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type productDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ type: Number, unique: true, required: true })
  productId?: number;

  @Prop()
  name?: string;

  @Prop()
  price?: number;

  @Prop()
  company?: string;

  @Prop()
  productType?: string;

  // @Prop()
  // ratings: string[];

  @Prop()
  description?: string;

  @Prop()
  size?: number;

  // @Prop()
  // tag: string[];

  @Prop()
  imageUrl?: string;

  @Prop()
  sellerId?: number;
}

export const productSchema = SchemaFactory.createForClass(Product);
