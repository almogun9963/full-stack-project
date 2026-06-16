import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsResolver } from "./products.resolver";
import { ApolloFederationDriver } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, productSchema } from "./entities/product.entity";
import { AuthGuard } from "@repo/common-auth";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { ProductsRepository } from "./products.repository";
import { join } from "path";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: productSchema }]),
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
    ProductsResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ProductsService,
    ProductsRepository,
  ],
})
export class ProductsModule {}
