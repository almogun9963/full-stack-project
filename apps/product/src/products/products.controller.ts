import { Controller } from "@nestjs/common";
import { Ctx, MessagePattern, NatsContext } from "@nestjs/microservices";
import { Product } from "./entities/product.entity";
import { ProductsService } from "./products.service";
@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: "getProductById" })
  getProductById(
    productIdToAdd: string,
    @Ctx() ctx: NatsContext,
  ): Promise<Product> {
    // console.log(ctx);
    return this.productsService.getProductById(productIdToAdd);
  }
}
