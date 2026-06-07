import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CartService } from "./cart.service";
import { Cart } from "./entities/cart.entity";
import { getUser } from "@repo/common-auth";

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Mutation(() => Cart)
  createCart(@getUser("userId") userId: string) {
    return this.cartService.create(userId);
  }

  @Query(() => Cart, { name: "getCart" })
  getCartById(@Args("id", { type: () => String }) id: string) {
    return this.cartService.getCartById(id);
  }

  @Mutation(() => Cart)
  addToCartById(
    @Args("id", { type: () => String }) id: string,
    @Args("productIdToAdd", { type: () => String }) productIdToAdd: string,
  ) {
    return this.cartService.addToCart(id, productIdToAdd);
  }

  @Mutation(() => String)
  deleteCart(@Args("id", { type: () => String }) id: string) {
    return this.cartService.deleteCart(id);
  }

  @Mutation(() => Cart)
  removeFromCart(
    @Args("id", { type: () => String }) id: string,
    @Args("productIdToRemove", { type: () => String })
    productIdToRemove: string,
  ) {
    return this.cartService.removeFromCart(id, productIdToRemove);
  }
}
