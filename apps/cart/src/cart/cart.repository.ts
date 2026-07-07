import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cart } from "./entities/cart.entity";

@Injectable()
export class CartRepository {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async create(userId: string): Promise<Cart> {
    try {
      return new this.cartModel({ userId }).save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(id: string): Promise<Cart | null> {
    try {
      return this.cartModel
        .findOne({ _id: id, deletedAt: { $exists: false } })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async addProduct(id: string, productIdToAdd: string): Promise<Cart | null> {
    try {
      return await this.cartModel
        .findOneAndUpdate(
          { _id: id, deletedAt: { $exists: false } },
          { $push: { productsIds: productIdToAdd } },
          { new: true },
        )
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async removeProduct(
    id: string,
    productIdToRemove: string,
  ): Promise<Cart | null> {
    try {
      return await this.cartModel
        .findOneAndUpdate(
          { _id: id, deletedAt: { $exists: false } },
          { $pull: { productsIds: productIdToRemove } },
          { new: true },
        )
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: string): Promise<Cart | null> {
    try {
      return await this.cartModel
        .findOneAndUpdate({ _id: id }, { deletedAt: new Date() }, { new: true })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
