import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Request } from "express";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext();

    let token: string | undefined;
    if (!gqlContext) {
      token = context.switchToRpc().getData().token;
    } else {
      token = this.extractTokenFromHeader(gqlContext?.req);
    }

    if (!token) {
      throw new UnauthorizedException("couldnt extract token from header");
    }

    const secret = this.configService.get<string>("JWT_SECRET");

    if (!secret) {
      throw new InternalServerErrorException(
        "JWT_SECRET is missing from the environment configuration",
      );
    }

    try {
      jwt.verify(token, secret);
      const decoded = jwt.verify(token, secret) as {
        id?: string;
        username?: string;
      };

      if (gqlContext) {
        gqlContext.user = decoded;
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
  }
}
