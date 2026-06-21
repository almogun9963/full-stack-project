import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserType } from "@repo/common-types";

@ObjectType()
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User implements UserType {
  @Field(() => ID)
  id?: string;

  @Field()
  @Prop()
  userName: string;

  @Prop()
  password: string;

  @Field(() => Date)
  @Prop()
  createdAt: Date;

  @Field(() => Date)
  @Prop()
  updatedAt: Date;
}

export const userSchema = SchemaFactory.createForClass(User);
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
