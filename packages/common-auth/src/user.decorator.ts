import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { secret } from './secret';
import { JwtPayload } from 'jsonwebtoken';

export const getUser = createParamDecorator(
  (_data: string | undefined, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const request = gqlContext.getContext().req.headers;
    const token = request.authorization?.split(' ')[1];

    const decoded = jwt.verify(token, secret);

    return (decoded as JwtPayload).id;
  },
);
