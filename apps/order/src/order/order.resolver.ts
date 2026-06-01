import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { getUser } from '@repo/shared/userDecorator';
@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'getOrdersByUser' })
  getOrdersByUser(@getUser('userId') userId: string) {
    console.log('Fetching orders for user:', userId);
    return this.orderService.getOrdersByUser(userId);
  }
}
