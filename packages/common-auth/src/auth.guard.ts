import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Request } from "express";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext();
    const token = this.extractTokenFromHeader(gqlContext.req);

    if (!token) {
      throw new UnauthorizedException();
    }

    const secret = this.configService.get<string>("JWT_SECRET");

    if (!secret) {
      throw new Error(
        "JWT_SECRET is missing from the environment configuration",
      );
    }

    try {
      const payload = jwt.verify(token, secret);
      gqlContext.user = payload;
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
