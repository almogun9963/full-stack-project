import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from "@nestjs/apollo";
import { IntrospectAndCompose, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,

      imports: [
        ConfigModule.forRoot({
          envFilePath: ["../../.env"],
          isGlobal: true,
        }),
      ],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        const MICROSERVICES_URI =
          configService.get<string>("MICROSERVICES_URI");
        const PRODUCTS_PORT = configService.get<string>("PRODUCTS_PORT");
        const CART_PORT = configService.get<string>("CART_PORT");
        const ORDER_PORT = configService.get<string>("ORDER_PORT");
        const USER_PORT = configService.get<string>("USER_PORT");

        return {
          driver: ApolloGatewayDriver,
          server: {
            context: ({ req }: { req: Request }) => ({ headers: req.headers }),
          },
          gateway: {
            buildService({ url }) {
              return new RemoteGraphQLDataSource<{
                headers?: Record<string, string>;
              }>({
                url,
                willSendRequest({ request, context }) {
                  const incomingHeaders = context?.headers;
                  if (incomingHeaders?.authorization) {
                    request?.http?.headers.set(
                      "authorization",
                      incomingHeaders.authorization,
                    );
                  }
                },
              });
            },
            supergraphSdl: new IntrospectAndCompose({
              subgraphs: [
                {
                  name: "product",
                  url: MICROSERVICES_URI + ":" + PRODUCTS_PORT + "/graphql",
                },
                {
                  name: "cart",
                  url: MICROSERVICES_URI + ":" + CART_PORT + "/graphql",
                },
                {
                  name: "order",
                  url: MICROSERVICES_URI + ":" + ORDER_PORT + "/graphql",
                },
                {
                  name: "user",
                  url: MICROSERVICES_URI + ":" + USER_PORT + "/graphql",
                },
              ],
            }),
          },
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
