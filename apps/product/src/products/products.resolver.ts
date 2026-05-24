import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { FiltersProductInput } from './dto/filters-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  addProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.addProduct(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAllProducts(
    @Args('filters', { nullable: true }) filters: FiltersProductInput,
  ) {
    console.log('filters: ', JSON.stringify(filters));
    return this.productsService.findAllProducts(filters);
  }

  @Query(() => Product, { name: 'getProduct' })
  getProductById(@Args('productId', { type: () => Int }) productId: number) {
    return this.productsService.getProductById(productId);
  }

  @Mutation(() => String, { name: 'removeProduct' })
  removeProduct(@Args('productId', { type: () => Int }) productId: number) {
    return this.productsService.removeProduct(productId);
  }
}
