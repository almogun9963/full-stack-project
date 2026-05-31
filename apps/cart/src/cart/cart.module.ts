import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { ApolloFederationDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, cartSchema } from './entities/cart.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.gaurd';

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
  providers: [
    CartResolver,

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    CartService,
  ],
})
export class CartModule {}
