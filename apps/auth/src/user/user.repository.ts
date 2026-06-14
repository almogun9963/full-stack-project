import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./entities/user.entity";
import { RefreshTokenEntity } from "./entities/refresh.token.entity";

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(userName: string) {
    const user = await this.userModel.findOne({ userName: userName }).exec();
    return user ? (user.toObject() as User) : null;
  }

  async create(createUserData: User): Promise<User> {
    return this.userModel.create(createUserData);
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async updateRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<User | null> {
    const refreshTokenEntity = {
      refreshToken: refreshToken,
      expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    } as RefreshTokenEntity;

    return this.userModel
      .findByIdAndUpdate(
        id,
        { $push: { refreshTokens: refreshTokenEntity } },
        { new: true },
      )
      .exec();
  }
}
