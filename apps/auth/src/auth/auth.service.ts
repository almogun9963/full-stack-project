import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import * as jwt from 'jsonwebtoken';
import { secret, secretRefreshToken } from '@repo/shared/secret';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

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

    const payload = {
      id: String(createdUser.id),
      username: createdUser.userName,
    };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: secretRefreshToken,
      expiresIn: '7d',
    });

    await this.userModel
      .findByIdAndUpdate(createdUser.id, { refreshToken })
      .exec();
    const updatedUser = { ...createdUser.toObject(), refreshToken };
    return updatedUser;
  }

  async signIn(
    id: string,
    password: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password || '');
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userId = String(user.id);
    const payload = { id: userId, username: user.userName ?? '' };
    const userFromDb: User | null = await this.userModel
      .findById(userId)
      .exec();

    let refreshToken = userFromDb?.refreshToken;

    if (!refreshToken) {
      refreshToken = await this.createnewRefreshToken(userId, payload);
      console.log('No refresh token found, created new one');
    } else {
      try {
        jwt.verify(refreshToken, secretRefreshToken);
        console.log('Refresh token is valid');
      } catch {
        console.log('Invalid refresh token, creating new one');
        refreshToken = await this.createnewRefreshToken(userId, payload);
      }
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const payload = { id: userId };
    const user = await this.userModel.findById(userId).exec();
    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async createnewRefreshToken(
    userId: string,
    payload: { id: string; username: string },
  ) {
    const newRefreshToken = await this.jwtService.signAsync(payload, {
      secret: secretRefreshToken,
      expiresIn: '7d',
    });

    await this.userModel
      .findByIdAndUpdate(userId, { refreshToken: newRefreshToken })
      .exec();

    return newRefreshToken;
  }
}
