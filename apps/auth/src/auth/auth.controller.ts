import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.id, signInDto.password);
  }

  @Post('refresh')
  refresh(@Body() refreshDto: { id: string; refreshToken: string }) {
    return this.authService.refreshTokens(
      refreshDto.id,
      refreshDto.refreshToken,
    );
  }
}
