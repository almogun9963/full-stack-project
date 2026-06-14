import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./entities/user.entity";

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
    return this.userModel
      .findByIdAndUpdate(id, { refreshToken }, { new: true })
      .exec();
  }
}
