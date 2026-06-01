import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './entities/cart.entity';
import { Model } from 'mongoose';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async create(userId: string) {
    const createdCart = new this.cartModel({ userId });
    const savedCart = await createdCart.save();
    return savedCart;
  }

  async getCartById(id: string) {
    const cart = await this.cartModel.findOne({ _id: id }).exec();

    if (cart == null) {
      throw new Error('Cart with id ' + id + ' not found');
    }

    return cart;
  }

  async addToCart(id: string, productIdToAdd: string) {
    const result = await this.cartModel
      .findOneAndUpdate(
        { _id: id },
        { $push: { productsIds: productIdToAdd } },
        { new: true },
      )
      .exec();

    return result;
  }

  async removeFromCart(id: string, productIdToRemove: string) {
    const result = await this.cartModel
      .findOneAndUpdate(
        { _id: id },
        { $pull: { productsIds: productIdToRemove } },
        { new: true },
      )
      .exec();

    return result;
  }

  async deleteCart(id: string) {
    await this.cartModel
      .findOneAndUpdate({ _id: id }, { deletedAt: new Date() }, { new: true })
      .exec();

    return 'Cart with id ' + id + ' has been deleted';
  }
}
