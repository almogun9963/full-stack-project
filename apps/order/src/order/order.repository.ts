import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "./entities/order.entity";
import { CreateOrderInput } from "./dto/create-order.input";

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(userId: string, createOrderInput: CreateOrderInput) {
    const createdOrder = new this.orderModel({ ...createOrderInput, userId });
    return await createdOrder.save();
  }

  async findByUserId(userId: string) {
    return await this.orderModel.find({ userId }).exec();
  }
}
