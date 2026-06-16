import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import { SignUpInput } from "./dto/sign-up.input";
import { SignInInput } from "./dto/sign-in.input";
import { RefreshInput } from "./dto/refresh.input";
import { TokenResponse } from "./entities/token.response";
import { UserRepository } from "../user/user.repository";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(signUpInput: SignUpInput): Promise<{
    id: string;
    userName: string;
    accessToken: string;
    refreshToken: string;
  }> {
    const hashedPassword = await bcrypt.hash(signUpInput?.password, 10);

    const createdUser = await this.userRepository.create({
      ...signUpInput,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const userId = createdUser.id || "";

    const payload = {
      id: userId,
      username: createdUser.userName,
    };
    const secretRefreshToken = this.configService.get<string>(
      "REFRESH_TOKEN_SECRET",
    );
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: secretRefreshToken,
      expiresIn: "7d",
    });

    await this.userRepository.updateRefreshToken(
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
    const user = await this.userService.findOne(signInInput.username || "");

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      signInInput.password,
      user.password ?? "",
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const userId = user.id;

    if (!userId) {
      throw new UnauthorizedException("Invalid user id");
    }
    const payload = { id: userId, username: user.userName };

    const refreshToken = await this.generateRefreshToken(userId, payload);
    this.logger.log(
      "Issued new refresh token. User found for sign-in:",
      user.userName,
    );

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: refreshToken,
    };
  }

  async refreshTokens(refreshInput: RefreshInput): Promise<{
    accessToken: string;
  }> {
    const userId = refreshInput.id;
    const user = await this.userRepository.findById(userId);
    if (!user?.refreshTokens) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const encryptedRefreshToken = await bcrypt.hash(
      refreshInput.refreshToken,
      10,
    );
    if (
      await bcrypt.compare(
        user.refreshTokens.at(user.refreshTokens.length - 1)?.refreshToken ||
          "",
        encryptedRefreshToken,
      )
    ) {
      return {
        accessToken: await this.jwtService.signAsync({
          id: userId,
          userName: user.userName,
        }),
      };
    }

    throw new UnauthorizedException("Invalid refresh token");
  }

  async generateRefreshToken(
    userId: string,
    payload: { id: string; username: string },
  ): Promise<string> {
    const secretRefreshToken = this.configService.get<string>(
      "REFRESH_TOKEN_SECRET",
    );

    const newRefreshToken = await this.jwtService.signAsync(payload, {
      secret: secretRefreshToken,
      expiresIn: "7d",
    });

    await this.userRepository.updateRefreshToken(userId, newRefreshToken);

    return newRefreshToken;
  }
}
