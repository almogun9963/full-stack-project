import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./order.repository";
import { CreateOrderInput } from "./dto/create-order.input";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async create(
    userId: string,
    createOrderInput: CreateOrderInput,
  ): Promise<Order> {
    return this.orderRepository.create(userId, createOrderInput);
  }

  async getOrdersByUser(userId: string): Promise<Order[]> {
    return this.orderRepository.findByUserId(userId);
  }
}
