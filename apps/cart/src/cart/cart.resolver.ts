import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from "@nestjs/graphql";
import { CartService } from "./cart.service";
import { Cart } from "./entities/cart.entity";
import { getUser } from "@repo/common-auth";
import { ProductsDataLoader } from "./products.dataloader";
import { ProductInsideCart } from "./entities/product.entity";
import { Context } from "@nestjs/graphql";
import { Request, Response } from "express";
import { NotFoundException } from "@nestjs/common";
@Resolver(() => Cart)
export class CartResolver {
  constructor(
    private readonly cartService: CartService,
    private readonly productDataLoader: ProductsDataLoader,
  ) {}

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
    @Context() context: { res: Response; req: Request },
    @Args("id", { type: () => String }) id: string,
    @Args("productIdToAdd", { type: () => String }) productIdToAdd: string,
  ): Promise<Cart | null> {
    try {
      await this.cartService.getCartById(id);
    } catch {
      throw new NotFoundException("Cart does not exist - add To Cart By Id");
    }

    try {
      const token =
        context.req.get("Authorization")?.split(" ")[1].toString() || "";
      return await this.cartService.addToCart(token, id, productIdToAdd);
    } catch {
      throw new NotFoundException("Product does not exist - add To Cart By Id");
    }
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
    try {
      return this.cartService.removeFromCart(id, productIdToRemove);
    } catch {
      throw new NotFoundException("Product does not exist - remove from cart");
    }
  }

  @ResolveField(() => [])
  async products(@Parent() cart: Cart): Promise<(ProductInsideCart | Error)[]> {
    const loader = this.productDataLoader.createLoader();
    const data = await loader.loadMany(cart.productsIds);

    return data;
  }
}
