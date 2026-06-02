import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {
  constructor(private cartRepository: CartRepository) {}

  async create(userId: string) {
    return this.cartRepository.create(userId);
  }

  async getCartById(id: string) {
    const cart = await this.cartRepository.findById(id);

    if (cart == null) {
      throw new Error('Cart with id ' + id + ' not found');
    }

    return cart;
  }

  async addToCart(id: string, productIdToAdd: string) {
    return this.cartRepository.addProduct(id, productIdToAdd);
  }

  async removeFromCart(id: string, productIdToRemove: string) {
    return this.cartRepository.removeProduct(id, productIdToRemove);
  }

  async deleteCart(id: string) {
    await this.cartRepository.softDelete(id);
    return 'Cart with id ' + id + ' has been deleted';
  }
}
