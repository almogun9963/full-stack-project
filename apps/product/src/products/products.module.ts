import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsResolver } from "./products.resolver";
import { ApolloFederationDriver } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, productSchema } from "./entities/product.entity";
import { AuthGuard, secret } from "@repo/common-auth";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { ProductsRepository } from "./products.repository";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: productSchema }]),
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
