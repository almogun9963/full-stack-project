import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "./entities/order.entity";
import { CreateOrderInput } from "./entities/create-order.input";

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(
    userId: string,
    createOrderInput: CreateOrderInput,
  ): Promise<Order> {
    try {
      const createdOrder = new this.orderModel({ ...createOrderInput, userId });
      return await createdOrder.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByUserId(userId: string): Promise<Order[]> {
    try {
      return await this.orderModel.find({ userId }).limit(50).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(id: string): Promise<Order | null> {
    try {
      return await this.orderModel.findById(id).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
