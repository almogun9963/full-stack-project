import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async update(updateUserInput: UpdateUserInput) {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(updateUserInput.id, updateUserInput, { new: true })
      .exec();
    return updatedUser;
  }
}
