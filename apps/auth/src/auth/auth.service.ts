import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import { secretRefreshToken } from "@repo/common-auth";
import { SignUpInput } from "./dto/sign-up.input";
import { SignInInput } from "./dto/sign-in.input";
import { RefreshInput } from "./dto/refresh.input";
import { AuthRepository } from "./auth.repository";
import { TokenResponse } from "./entities/token.response";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpInput: SignUpInput) {
    const hashedPassword = await bcrypt.hash(signUpInput?.password || "", 10);

    const createdUser = await this.authRepository.create({
      ...signUpInput,
      password: hashedPassword,
    });

    const userId = createdUser.id || "";

    const payload = {
      id: userId,
      username: createdUser.userName,
    };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: "7d",
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
    console.log(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
        process.env.REFRESH_TOKEN_SECRET +
        "bbbbbbbbbbb" +
        process.env.JWT_SECRET,
      +"ccccccccccccccccc" + secretRefreshToken,
    );

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: refreshToken,
    };
  }

  async refreshTokens(refreshInput: RefreshInput) {
    const userId = refreshInput.id || "";
    const user = await this.authRepository.findById(userId);
    if (!user?.refreshToken) {
      throw new UnauthorizedException("Invalid refresh token");
    }
    const presentedToken = refreshInput.refreshToken ?? "";
    try {
      await this.jwtService.verifyAsync(presentedToken, {
        secret: secretRefreshToken,
      });
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }
    return {
      accessToken: await this.jwtService.signAsync({
        id: userId,
        userName: user.userName,
      }),
    };
  }

  async generateRefreshToken(
    userId: string,
    payload: { id: string; username: string },
  ) {
    const newRefreshToken = await this.jwtService.signAsync(payload, {
      secret: secretRefreshToken,
      expiresIn: "7d",
    });

    await this.authRepository.updateRefreshToken(userId, newRefreshToken);

    return newRefreshToken;
  }
}
