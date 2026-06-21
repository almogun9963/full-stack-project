import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { SignUpInput } from "./dto/sign-up.input";
import { SignInInput } from "./dto/sign-in.input";
import { TokenResponse } from "./schemas/token-response.scema";
import type { Response, Request } from "express";
import { RefreshInput } from "./dto/refresh.input";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => TokenResponse)
  async signUp(
    @Context() context: { res: Response; req: Request },
    @Args("signUpInput") signUpInput: SignUpInput,
  ): Promise<TokenResponse> {
    const tokenResponse = await this.authService.signUp(signUpInput);
    this.setAuthCookies(context, tokenResponse);
    return tokenResponse;
  }

  @Mutation(() => TokenResponse)
  async signIn(
    @Context() context: { res: Response; req: Request },
    @Args("signInInput") signInInput: SignInInput,
  ): Promise<TokenResponse> {
    const tokenResponse = await this.authService.signIn(signInInput);
    this.setAuthCookies(context, tokenResponse);
    return tokenResponse;
  }

  @Mutation(() => TokenResponse)
  async refresh(
    @Context() context: { res: Response },
    @Args("refreshInput") refreshInput: RefreshInput,
  ): Promise<{
    accessToken: string;
  }> {
    const accessToken = this.authService.refreshTokens(refreshInput);
    context.res.cookie("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 1 * 60 * 60 * 1000,
    });

    return accessToken;
  }

  setAuthCookies(
    context: { res: Response },
    tokenResponse: TokenResponse,
  ): void {
    context.res.cookie("accessToken", tokenResponse.accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 1 * 60 * 60 * 1000,
    });

    context.res.cookie("refreshToken", tokenResponse.refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
