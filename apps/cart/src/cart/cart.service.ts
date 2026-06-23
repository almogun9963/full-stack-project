import { CartRepository } from "./cart.repository";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Cart } from "./entities/cart.entity";
import { firstValueFrom } from "rxjs";
import { ClientProxy } from "@nestjs/microservices";
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

  async addToCart(id: string, productIdToAdd: string): Promise<Cart | null> {
    const product = await firstValueFrom(
      this.client.send({ cmd: "getProductById" }, productIdToAdd),
    );

    if (!product) {
      throw new NotFoundException("Product does not exist");
    }

    return this.cartRepository.addProduct(id, productIdToAdd);
  }

  async removeFromCart(
    id: string,
    productIdToRemove: string,
  ): Promise<Cart | null> {
    return this.cartRepository.removeProduct(id, productIdToRemove);
  }

  async deleteCart(id: string): Promise<string> {
    const isDeleted = await this.cartRepository.delete(id);
    return isDeleted
      ? "Cart with id " + id + " has been deleted"
      : "cart not found";
  }
}
