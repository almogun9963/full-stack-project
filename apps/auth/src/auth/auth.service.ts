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

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    id: string,
    password: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user?.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: String(user.id), username: user.userName };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: 'REFRESH_TOKEN_SECRET',
      expiresIn: '7d',
    });

    await this.userModel.findByIdAndUpdate(user.id, { refreshToken }).exec();
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
}
