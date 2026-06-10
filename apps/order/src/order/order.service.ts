import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./order.repository";
import { CreateOrderInput } from "./dto/create-order.input";

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async create(userId: string, createOrderInput: CreateOrderInput) {
    return this.orderRepository.create(userId, createOrderInput);
  }

  async getOrdersByUser(userId: string) {
    return this.orderRepository.findByUserId(userId);
  }
}
