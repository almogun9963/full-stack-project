import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserInput: CreateUserInput) {
    const { password, ...rest } = createUserInput;

    if (!password) {
      throw new Error('Password is required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.userModel.create({
      ...rest,
      password: hashedPassword,
    });

    return createdUser;
  }

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
