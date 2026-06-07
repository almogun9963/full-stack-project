import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { secretRefreshToken } from '@repo/shared/secret';
import { SignUpInput } from './dto/sign-up.input';
import { SignInInput } from './dto/sign-in.input';
import { RefreshInput } from './dto/refresh.input';
import { AuthRepository } from './auth.repository';
import { TokenResponse } from './entities/token.response';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpInput: SignUpInput) {
    const hashedPassword = await bcrypt.hash(signUpInput?.password || '', 10);

    const createdUser = (await this.authRepository.create({
      ...signUpInput,
      password: hashedPassword,
    })) as User;

    const userId = String(createdUser.id ?? '');

    const payload = {
      id: userId,
      username: createdUser.userName,
    };

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: secretRefreshToken,
      expiresIn: '7d',
    });

    await this.authRepository.updateRefreshToken(
      userId,
      await bcrypt.hash(refreshToken, 10),
    );

    const accessToken = await this.jwtService.signAsync(payload);
    return {
      id: userId,
      userName: createdUser.userName,
      accessToken,
      refreshToken,
    };
  }

  async signIn(signInInput: SignInInput): Promise<TokenResponse> {
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
      this.logger.log('No refresh token found, created new one');
    } else {
      try {
        jwt.verify(refreshToken, secretRefreshToken);
        this.logger.log('Refresh token is valid');
      } catch {
        this.logger.log('Invalid refresh token, creating new one');
        refreshToken = await this.generateRefreshToken(userId, payload);
      }
    }
    this.logger.log('User found for sign-in:', user.userName);

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: refreshToken,
    };
  }

  async refreshTokens(refreshInput: RefreshInput) {
    const payload = { id: refreshInput.id || '' };
    const user = (await this.authRepository.findById(
      refreshInput.id || '',
    )) as User | null;
    if (!user || user.refreshToken !== refreshInput.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return {
      accessToken: await this.jwtService.signAsync(payload),
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

    await this.authRepository.updateRefreshToken(userId, newRefreshToken);

    return newRefreshToken;
  }
}
