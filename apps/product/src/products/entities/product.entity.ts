import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsEnum } from 'class-validator';
import { Tag } from '../dto/tags.enum';

@ObjectType()
@Schema()
export class Product {
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
  @IsArray()
  ratings?: number[];

  @Field()
  @Prop()
  description?: string;

  @Field()
  @Prop()
  size?: string;

  @Field(() => [Tag])
  @Prop({ type: [String], enum: Tag, default: [Tag.North] })
  @IsArray()
  @IsEnum(Tag, { each: true })
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
