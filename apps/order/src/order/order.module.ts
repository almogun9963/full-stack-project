import { Module } from '@nestjs/common';
import { ApolloFederationDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { Order, orderSchema } from './entities/order.entity';
import { OrderResolver } from './order.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: orderSchema }]),
    GraphQLModule.forRoot({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
  ],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}
