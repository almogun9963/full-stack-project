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
// import { ProductDataLoader } from "../../../../apps/product/src/products/product.dataloader";
// import { Product } from "../../../product/src/products/entities/product.entity";
@Resolver(() => Cart)
export class CartResolver {
  constructor(
    private readonly cartService: CartService,
    // private productDataLoader: ProductDataLoader,
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
  addToCartById(
    @Args("id", { type: () => String }) id: string,
    @Args("productIdToAdd", { type: () => String }) productIdToAdd: string,
  ): Promise<Cart | null> {
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
  // @ResolveField(() => [Product])
  // async products(@Parent() cart: Cart): Promise<(Product | Error)[]> {
  //   const loader = this.productDataLoader.createLoader();
  //   return await loader.loadMany(cart.productsIds);
  // }
}
