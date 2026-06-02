import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { ApolloFederationDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, cartSchema } from './entities/cart.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@repo/shared/guard';
import { JwtModule } from '@nestjs/jwt';
import { secret } from '@repo/shared/secret';
import { CartRepository } from './cart.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: cartSchema }]),
    GraphQLModule.forRoot({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    JwtModule.register({
      global: true,
      secret: secret,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [
    CartResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    CartService,
    CartRepository,
  ],
})
export class CartModule {}
