import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { CreateCartInput } from './dto/create-cart.input';
@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Mutation(() => Cart)
  createCart(@Args('createCartInput') createCartInput: CreateCartInput) {
    return this.cartService.create(createCartInput);
  }

  @Query(() => Cart, { name: 'getCart' })
  getCartById(@Args('id', { type: () => String }) id: string) {
    return this.cartService.getCartById(id);
  }

  @Mutation(() => Cart)
  addToCartById(
    @Args('id', { type: () => String }) id: string,
    @Args('productIdToAdd', { type: () => String }) productIdToAdd: string,
  ) {
    return this.cartService.addToCart(id, productIdToAdd);
  }

  @Mutation(() => String)
  deleteCart(@Args('id', { type: () => String }) id: string) {
    return this.cartService.deleteCart(id);
  }

  @Mutation(() => Cart)
  removeFromCart(
    @Args('id', { type: () => String }) id: string,
    @Args('productIdToRemove', { type: () => String })
    productIdToRemove: string,
  ) {
    return this.cartService.removeFromCart(id, productIdToRemove);
  }
}
