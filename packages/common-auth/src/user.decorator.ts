import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const getUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const context = gqlContext.getContext();
    const user = context?.user as Record<string, unknown> | undefined;
    if (!user) return undefined;
    if (data && data in user) return user[data];
    return user.id;
  },
);
