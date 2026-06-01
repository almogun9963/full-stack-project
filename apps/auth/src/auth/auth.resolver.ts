import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

import { User } from 'src/user/entities/user.entity';
import { SignUpInput } from './dto/sing-up.input';
import { SignInInput } from './dto/sign-in.input';
import { RefreshInput } from './dto/refresh,input';
import { TokenResponse } from './entities/token.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  signUp(@Args('SignUpInput') signUpInput: SignUpInput) {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => TokenResponse)
  async signIn(@Args('SignInInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }

  @Mutation(() => TokenResponse)
  refresh(@Args('RefreshInput') refreshInput: RefreshInput) {
    return this.authService.refreshTokens(refreshInput);
  }
}
