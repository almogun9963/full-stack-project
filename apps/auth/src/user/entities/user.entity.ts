import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { UserType } from "@repo/common-types";

@ObjectType()
@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User implements UserType {
  @Field(() => ID)
  @Prop({
    type: String,
    get: function (this: Document & { _id?: Types.ObjectId }) {
      const id = this._id as Types.ObjectId | undefined;
      return id;
    },
  })
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

userSchema.set("toObject", { getters: true, virtuals: true });
userSchema.set("toJSON", { getters: true, virtuals: true });
