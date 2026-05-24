import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
// import { UpdateProductInput } from './dto/update-product.input';

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
  findAllProducts() {
    return this.productsService.findAllProducts();
  }

  // @Query(() => Product, { name: 'product' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.productsService.findOne(id);
  // }

  // @Mutation(() => Product)
  // updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
  //   return this.productsService.update(updateProductInput.id, updateProductInput);
  // }

  @Mutation(() => String, { name: 'removeProduct' })
  removeProduct(@Args('productId', { type: () => Int }) productId: number) {
    return this.productsService.removeProduct(productId);
  }
}
