import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { ApolloFederationDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, cartSchema } from './entities/cart.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: cartSchema }]),
    GraphQLModule.forRoot({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
  ],
  providers: [CartResolver, CartService],
})
export class CartModule {}
