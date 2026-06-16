import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cart } from "./entities/cart.entity";

@Injectable()
export class CartRepository {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async create(userId: string): Promise<Cart> {
    const createdCart = new this.cartModel({ userId });
    return await createdCart.save();
  }

  async findById(id: string): Promise<Cart | null> {
    return await this.cartModel.findOne({ _id: id }).exec();
  }

  async addProduct(id: string, productIdToAdd: string): Promise<Cart | null> {
    return await this.cartModel
      .findOneAndUpdate(
        { _id: id },
        { $push: { productsIds: productIdToAdd } },
        { new: true },
      )
      .exec();
  }

  async removeProduct(
    id: string,
    productIdToRemove: string,
  ): Promise<Cart | null> {
    return await this.cartModel
      .findOneAndUpdate(
        { _id: id },
        { $pull: { productsIds: productIdToRemove } },
        { new: true },
      )
      .exec();
  }

  async delete(id: string): Promise<Cart | null> {
    return await this.cartModel
      .findOneAndUpdate({ _id: id }, { deletedAt: new Date() }, { new: true })
      .exec();
  }
}
