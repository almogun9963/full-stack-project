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
import { TokenResponse } from "./schemas/token-response.scema";
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

  async signUp(signUpInput: SignUpInput): Promise<TokenResponse> {
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
    const refreshToken = await this.generateRefreshToken(payload);

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

    const refreshToken = await this.generateRefreshToken(payload);
    this.logger.log(
      "Issued new refresh token. User found for sign-in:",
      user.userName,
    );

    return {
      id: userId,
      userName: user.userName,
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: refreshToken,
    };
  }

  async refreshTokens(refreshInput: RefreshInput): Promise<{
    accessToken: string;
  }> {
    const userId = refreshInput.id;
    const secretRefreshToken = this.configService.get<string>(
      "REFRESH_TOKEN_SECRET",
    );

    if (!secretRefreshToken) {
      throw new Error(
        "JWT_SECRET is missing from the environment configuration",
      );
    }
    try {
      this.jwtService.verify(refreshInput.refreshToken, {
        secret: secretRefreshToken,
      });
    } catch {
      throw new UnauthorizedException();
    }

    return {
      accessToken: await this.jwtService.signAsync({
        id: userId,
      }),
    };
  }

  async generateRefreshToken(payload: {
    id: string;
    username: string;
  }): Promise<string> {
    const secretRefreshToken = this.configService.get<string>(
      "REFRESH_TOKEN_SECRET",
    );

    const newRefreshToken = await this.jwtService.signAsync(payload, {
      secret: secretRefreshToken,
      expiresIn: "7d",
    });
    return newRefreshToken;
  }
}
