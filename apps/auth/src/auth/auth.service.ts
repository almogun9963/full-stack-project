import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { secretRefreshToken } from '@repo/shared/secret';
import { SignUpInput } from './dto/sing-up.input';
import { SignInInput } from './dto/sign-in.input';
import { RefreshInput } from './dto/refresh,input';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(loginInput: SignUpInput) {
    const hashedPassword = await bcrypt.hash(loginInput?.password || '', 10);

    const createdUser = await this.userModel.create({
      ...loginInput,
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
    console.log('User created with refresh token:', updatedUser);
    return updatedUser;
  }

  async signIn(
    signInInput: SignInInput,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.userService.findOne(signInInput.id || '');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      signInInput.password ?? '',
      user.password ?? '',
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userId = user.id ?? '';
    if (!userId) {
      throw new UnauthorizedException('Invalid user id');
    }
    const payload = { id: userId, username: user.userName ?? '' };

    let refreshToken = user?.refreshToken;

    if (!refreshToken) {
      refreshToken = await this.generateRefreshToken(userId, payload);
      console.log('No refresh token found, created new one');
    } else {
      try {
        jwt.verify(refreshToken, secretRefreshToken);
        console.log('Refresh token is valid');
      } catch {
        console.log('Invalid refresh token, creating new one');
        refreshToken = await this.generateRefreshToken(userId, payload);
      }
    }
    console.log('User found for sign-in:', user.userName);

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: refreshToken,
    };
  }

  async refreshTokens(refreshInput: RefreshInput) {
    const payload = { id: refreshInput.id || '' };
    const user = await this.userModel.findById(refreshInput.id || '').exec();
    if (!user || user.refreshToken !== refreshInput.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async generateRefreshToken(
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
