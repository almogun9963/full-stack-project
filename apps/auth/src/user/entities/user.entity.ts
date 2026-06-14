import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserType } from "@repo/common-types";

@ObjectType()
@Schema()
export class User implements UserType {
  @Field(() => ID)
  id?: string;

  @Field()
  @Prop()
  userName: string;

  @Prop()
  password: string;

  @Prop({ nullable: true })
  refreshToken?: string;
}

export const userSchema = SchemaFactory.createForClass(User);
