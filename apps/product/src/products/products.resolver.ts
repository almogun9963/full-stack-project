import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { ProductsService } from "./products.service";
import { Product } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.input";
import { FiltersProductInput } from "./dto/filters-product.input";

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  addProduct(@Args("createProductInput") createProductInput: CreateProductDto) {
    return this.productsService.addProduct(createProductInput);
  }

  @Query(() => [Product], { name: "products" })
  findAllProducts(
    @Args("filters", { nullable: true }) filters: FiltersProductInput,
  ) {
    return this.productsService.findAllProducts(filters);
  }

  @Query(() => Product, { name: "getProduct" })
  getProductById(@Args("id", { type: () => String }) id: string) {
    return this.productsService.getProductById(id);
  }

  @Mutation(() => String, { name: "removeProduct" })
  removeProduct(@Args("id", { type: () => String }) id: string) {
    return this.productsService.removeProduct(id);
  }
}
