import DataLoader from "dataloader";
import { Injectable, Scope } from "@nestjs/common";
import { CartService } from "./cart.service";
import { ProductInsideCart } from "./entities/product.entity";

@Injectable({ scope: Scope.REQUEST })
export class ProductsDataLoader {
  constructor(private cartService: CartService) {}

  createLoader() {
    return new DataLoader<string, ProductInsideCart>(
      async (productIds: readonly string[]) => {
        const products = await Promise.all(
          productIds.map((id) => this.cartService.getProductById(id)),
        );
        return products;
      },
    );
  }
}
