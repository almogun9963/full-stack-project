import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
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
  refresh(@Req() req: any) {
    console.log(req);
    return this.authService.refreshTokens(req.body.id, req.body.refreshToken);
  }
}
