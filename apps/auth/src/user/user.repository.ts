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
}
