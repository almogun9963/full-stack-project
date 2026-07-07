import { Resolver, Query, Args } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { UseGuards } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { AuthGuard } from "@repo/common-auth";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard)
  @Query(() => User, { name: "user" })
  findOne(
    @Args("id", { type: () => String }) id: string,
  ): Promise<User | null> {
    return this.userService.findOne(id);
  }
}
