import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from "jsonwebtoken";
import { secret } from "./secret.js";
import { JwtPayload } from "jsonwebtoken";

export const getUser = createParamDecorator(
  (_data: string | undefined, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const headers = gqlContext.getContext()?.req?.headers;
    const [type, token] = headers?.authorization?.split(" ") ?? [];

    try {
      const decoded = jwt.verify(token, secret) as JwtPayload;
      if (type !== "Bearer" || !token) {
        throw new UnauthorizedException();
      }
      return decoded.id;
    } catch {
      throw new UnauthorizedException();
    }
  },
);
