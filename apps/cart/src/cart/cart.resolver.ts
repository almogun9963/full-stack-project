import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CartService } from "./cart.service";
import { Cart } from "./entities/cart.entity";
import { getUser } from "@repo/common-auth";
import { NotFoundException } from "@nestjs/common";

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Mutation(() => Cart)
  createCart(@getUser("userId") userId: string): Promise<Cart> {
    return this.cartService.create(userId);
  }

  @Query(() => Cart, { name: "getCart" })
  getCartById(
    @Args("id", { type: () => String }) id: string,
  ): Promise<Cart | null> {
    return this.cartService.getCartById(id);
  }

  @Mutation(() => Cart)
  async addToCartById(
    @Args("id", { type: () => String }) id: string,
    @Args("productIdToAdd", { type: () => String }) productIdToAdd: string,
  ): Promise<Cart | null> {
    await this.cartService.getCartById(id);

    return this.cartService.addToCart(id, productIdToAdd);
  }

  @Mutation(() => String)
  deleteCart(@Args("id", { type: () => String }) id: string): Promise<string> {
    return this.cartService.deleteCart(id);
  }

  @Mutation(() => Cart)
  removeFromCart(
    @Args("id", { type: () => String }) id: string,
    @Args("productIdToRemove", { type: () => String })
    productIdToRemove: string,
  ): Promise<Cart | null> {
    return this.cartService.removeFromCart(id, productIdToRemove);
  }
}
