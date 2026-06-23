import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { Product } from "./entities/product.entity";
import { ProductsService } from "./products.service";
@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: "getProductById" })
  getProductById(productIdToAdd: string): Promise<Product> {
    return this.productsService.getProductById(productIdToAdd);
  }
}
