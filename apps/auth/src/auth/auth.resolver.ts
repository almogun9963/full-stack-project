// auth.resolver.ts
import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { User } from "src/user/entities/user.entity";
import { SignUpInput } from "./dto/sign-up.input";
import { SignInInput } from "./dto/sign-in.input";
import { RefreshInput } from "./dto/refresh.input";
import { TokenResponse } from "./entities/token.response";
import type { Response, Request } from "express";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async signUp(
    @Context() context: { res: Response; req: Request },
    @Args("signUpInput") signUpInput: SignUpInput,
  ) {
    const user = await this.authService.signUp(signUpInput);
    context.res.cookie("accessToken", user.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return user;
  }

  @Mutation(() => TokenResponse)
  async signIn(
    @Context() context: { res: Response },
    @Args("signInInput") signInInput: SignInInput,
  ) {
    const tokens = await this.authService.signIn(signInInput);
    context.res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return tokens;
  }

  @Mutation(() => TokenResponse)
  async refresh(@Args("refreshInput") refreshInput: RefreshInput) {
    return this.authService.refreshTokens(refreshInput);
  }
}
