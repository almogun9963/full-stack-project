import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cart } from "./entities/cart.entity";

@Injectable()
export class CartRepository {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async create(userId: string) {
    const createdCart = new this.cartModel({ userId });
    return await createdCart.save();
  }

  async findById(id: string) {
    return await this.cartModel.findOne({ _id: id }).exec();
  }

  async addProduct(id: string, productIdToAdd: string) {
    return await this.cartModel
      .findOneAndUpdate(
        { _id: id },
        { $push: { productsIds: productIdToAdd } },
        { new: true },
      )
      .exec();
  }

  async removeProduct(id: string, productIdToRemove: string) {
    return await this.cartModel
      .findOneAndUpdate(
        { _id: id },
        { $pull: { productsIds: productIdToRemove } },
        { new: true },
      )
      .exec();
  }

  async softDelete(id: string) {
    return await this.cartModel
      .findOneAndUpdate({ _id: id }, { deletedAt: new Date() }, { new: true })
      .exec();
  }
}
