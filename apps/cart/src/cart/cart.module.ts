import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartResolver } from "./cart.resolver";
import { ApolloFederationDriver } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { Cart, cartSchema } from "./entities/cart.entity";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "@repo/common-auth";
import { JwtModule } from "@nestjs/jwt";
import { CartRepository } from "./cart.repository";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ProductsDataLoader } from "./products.dataloader";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "PRODUCT_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "localhost",
          port: 3007,
        },
      },
    ]),

    MongooseModule.forFeature([{ name: Cart.name, schema: cartSchema }]),
    GraphQLModule.forRoot({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>("JWT_SECRET");
        return {
          secret: secret,
          signOptions: { expiresIn: "600s" },
        };
      },
    }),
  ],
  providers: [
    ProductsDataLoader,
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
