import { CartRepository } from "./cart.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Cart } from "./entities/cart.entity";
@Injectable()
export class CartService {
  constructor(private cartRepository: CartRepository) {}

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
