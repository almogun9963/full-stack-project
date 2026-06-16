import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class RefreshTokenEntity {
  @Field(() => ID)
  id?: string;

  @Field()
  expireAt: Date;

  @Prop({ nullable: true })
  refreshToken: string;
}

export const refreshTokenSchema =
  SchemaFactory.createForClass(RefreshTokenEntity);
refreshTokenSchema.set("toObject", { virtuals: true });
refreshTokenSchema.set("toJSON", { virtuals: true });
refreshTokenSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
