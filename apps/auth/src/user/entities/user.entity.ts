import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserType } from '@repo/shared/userType';

@ObjectType()
@Schema()
export class User implements UserType {
  @Field(() => ID)
  id?: string;

  @Field()
  @Prop()
  userName?: string;

  @Field()
  @Prop()
  password?: string;

  @Field({ nullable: true })
  @Prop({ nullable: true })
  refreshToken?: string;
}

export const userSchema = SchemaFactory.createForClass(User);

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });
