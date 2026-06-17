import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { SignUpInput } from "./dto/sign-up.input";
import { SignInInput } from "./dto/sign-in.input";
import { RefreshInput } from "./dto/refresh.input";
import { TokenResponse } from "./entities/token.response";
import type { Response, Request } from "express";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => TokenResponse)
  async signUp(
    @Context() context: { res: Response; req: Request },
    @Args("signUpInput") signUpInput: SignUpInput,
  ): Promise<TokenResponse> {
    const tokenResponse = await this.authService.signUp(signUpInput);
    context.res.cookie("accessToken", tokenResponse.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
    });
    return tokenResponse;
  }

  @Mutation(() => TokenResponse)
  async signIn(
    @Context() context: { res: Response },
    @Args("signInInput") signInInput: SignInInput,
  ): Promise<TokenResponse> {
    const tokens = await this.authService.signIn(signInInput);
    context.res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      sameSite: "lax",
    });
    return tokens;
  }

  @Mutation(() => TokenResponse)
  async refresh(@Args("refreshInput") refreshInput: RefreshInput): Promise<{
    accessToken: string;
  }> {
    return this.authService.refreshTokens(refreshInput);
  }
}
