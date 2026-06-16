import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const getUser = createParamDecorator(
  (_data: string | undefined, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const context = gqlContext.getContext();
    return context?.user?.id;
  },
);
