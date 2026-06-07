import { Module } from "@nestjs/common";
import { ApolloFederationDriver } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderService } from "./order.service";
import { Order, orderSchema } from "./entities/order.entity";
import { OrderResolver } from "./order.resolver";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard, secret } from "@repo/common-auth";
import { JwtModule } from "@nestjs/jwt";
import { OrderRepository } from "./order.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: orderSchema }]),
    GraphQLModule.forRoot({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    JwtModule.register({
      global: true,
      secret: secret,
    }),
  ],
  providers: [
    OrderResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    OrderService,
    OrderRepository,
  ],
})
export class OrderModule {}
