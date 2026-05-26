import { Injectable } from '@nestjs/common';
import { CreateCartInput } from './dto/create-cart.input';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './entities/cart.entity';
import { Model } from 'mongoose';
@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async create(createCartInput: CreateCartInput) {
    const createdCart = new this.cartModel(createCartInput);
    const savedCart = await createdCart.save();
    return savedCart;
  }

  async findOne(id: string) {
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
    const result = await this.cartModel.findByIdAndRemove(id).exec();
    return `successfully deleted cart with id: ${id}. deleted cart: ${JSON.stringify(result)}`;
  }
}
