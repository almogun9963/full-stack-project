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
    ClientsModule.registerAsync([
      {
        name: "PRODUCT_SERVICE",
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>("TCP_URI"),
            port: Number(configService.get<string>("TCP_PORT")),
          },
        }),
        inject: [ConfigService],
      },
    ]),

    MongooseModule.forFeature([{ name: Cart.name, schema: cartSchema }]),
    GraphQLModule.forRoot({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
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
