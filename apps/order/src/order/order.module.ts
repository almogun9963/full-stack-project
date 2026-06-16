import { Module } from "@nestjs/common";
import { ApolloFederationDriver } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderService } from "./order.service";
import { Order, orderSchema } from "./entities/order.entity";
import { OrderResolver } from "./order.resolver";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "@repo/common-auth";
import { JwtModule } from "@nestjs/jwt";
import { OrderRepository } from "./order.repository";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { join } from "path";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: orderSchema }]),
    GraphQLModule.forRoot({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    ConfigModule.forRoot({
      envFilePath: [
        join(process.cwd(), ".env"),
        join(__dirname, "..", "..", "..", ".env"),
      ],
      isGlobal: true,
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
