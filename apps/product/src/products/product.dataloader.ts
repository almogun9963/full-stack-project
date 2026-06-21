import DataLoader from "dataloader";
import { Product } from "./entities/product.entity";
import { ProductsService } from "./products.service";
import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.REQUEST })
export class ProductDataLoader {
  constructor(private productService: ProductsService) {}

  createLoader() {
    return new DataLoader<string, Product>(
      async (productIds: readonly string[]) => {
        const products = await Promise.all(
          productIds.map((id) => this.productService.getProductById(id)),
        );

        return products;
      },
    );
  }
}
