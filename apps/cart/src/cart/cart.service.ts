import { CartRepository } from "./cart.repository";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Cart } from "./entities/cart.entity";
import { firstValueFrom } from "rxjs";
import { ClientProxy } from "@nestjs/microservices";
import { ProductInsideCart } from "./entities/product.entity";

@Injectable()
export class CartService {
  constructor(
    private cartRepository: CartRepository,
    @Inject("PRODUCT_SERVICE") private client: ClientProxy,
  ) {}

  async create(userId: string) {
    return this.cartRepository.create(userId);
  }

  async getCartById(id: string): Promise<Cart> {
    const cart = await this.cartRepository.findById(id);

    if (!cart) {
      throw new NotFoundException(`Cart with id ${id} not found`);
    }

    return cart;
  }

  async addToCart(
    token: string,
    id: string,
    productIdToAdd: string,
  ): Promise<Cart | null> {
    try {
      const product = await this.getProductById(token, productIdToAdd);

      if (!product) {
        throw new NotFoundException("Product does not exist - add to cart");
      }

      return await this.cartRepository.addProduct(id, productIdToAdd);
    } catch {
      throw new NotFoundException("Product does not exist - add to cart");
    }
  }

  async getProductById(
    token: string,
    productIdToAdd: string,
  ): Promise<ProductInsideCart> {
    try {
      const payload = {
        token: token,
        productIdToAdd: productIdToAdd,
      };
      const product = await firstValueFrom(
        this.client.send({ cmd: "getProductById" }, payload),
      );

      return product;
    } catch {
      throw new NotFoundException("Product does not exist - get Product");
    }
  }

  async removeFromCart(
    id: string,
    productIdToRemove: string,
  ): Promise<Cart | null> {
    const cart = await this.getCartById(id);
    if (!cart.productsIds.includes(productIdToRemove)) {
      throw new NotFoundException("Product does not exist - remove from cart");
    }

    return this.cartRepository.removeProduct(id, productIdToRemove);
  }

  async deleteCart(id: string): Promise<string> {
    const cart = await this.getCartById(id);

    if (cart) {
      await this.cartRepository.delete(id);
      return `Cart with id ${id} has been deleted`;
    }

    return `Cart with id ${id} not found`;
  }
}
