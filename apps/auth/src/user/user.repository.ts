import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./entities/user.entity";

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(userName: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ userName: userName }).exec();
      return user ? (user.toObject() as User) : null;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(createUserData: User): Promise<User> {
    try {
      return this.userModel.create(createUserData);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      return this.userModel.findById(id).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
