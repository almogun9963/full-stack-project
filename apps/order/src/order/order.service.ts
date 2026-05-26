import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(createOrderInput: CreateOrderInput) {
    const createdOrder = new this.orderModel(createOrderInput);
    const savedOrder = await createdOrder.save();
    return savedOrder;
  }

  async getOrdersByUser(userId: string) {
    return await this.orderModel.find({ userId }).exec();
  }
}
