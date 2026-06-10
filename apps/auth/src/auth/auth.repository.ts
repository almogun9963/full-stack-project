import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

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
