import DataLoader from "dataloader";
import { Inject, Injectable, Scope } from "@nestjs/common";
import { CartService } from "./cart.service";
import { ProductInsideCart } from "./entities/product.entity";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";

@Injectable({ scope: Scope.REQUEST })
export class ProductsDataLoader {
  constructor(
    private cartService: CartService,
    @Inject(REQUEST) private request: { req: Request },
  ) {}

  createLoader() {
    return new DataLoader<string, ProductInsideCart>(
      async (productIds: readonly string[]) => {
        const req: Request = this.request.req || this.request;
        const token = req.get("Authorization")?.split(" ")[1]?.toString() || "";
        const products = await Promise.all(
          productIds.map((id) => this.cartService.getProductById(token, id)),
        );
        return products;
      },
    );
  }
}
