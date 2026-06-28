import { ObjectType, Field } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class RefreshTokenEntity {
  @Field(() => String)
  id?: string;

  @Field()
  @Prop({ type: String, ref: "User", required: true, unique: true })
  userId: string;

  @Field()
  @Prop()
  expireAt: Date;

  @Prop({ nullable: true })
  @Field()
  refreshToken: string;
}

export const RefreshTokenSchema =
  SchemaFactory.createForClass(RefreshTokenEntity);
RefreshTokenSchema.set("toObject", { virtuals: true });
RefreshTokenSchema.set("toJSON", { virtuals: true });
RefreshTokenSchema.index({ userId: 1 });
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
RefreshTokenSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
