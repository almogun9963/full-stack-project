import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from "@nestjs/apollo";
import { IntrospectAndCompose, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ConfigModule, ConfigService } from "@nestjs/config";
import type { Request, Response } from "express";

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
            context: ({ req, res }: { req: Request; res: Response }) => ({
              headers: req.headers,
              req,
              res,
            }),
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
                async didReceiveResponse({ response, context }) {
                  const setCookieHeader =
                    response.http?.headers.get("set-cookie");
                  console.log(setCookieHeader);

                  const res = (context as any)?.res as Response | undefined;

                  if (
                    setCookieHeader &&
                    res &&
                    typeof res.setHeader === "function"
                  ) {
                    const cookiesArray = setCookieHeader.split(
                      /,(?=\s*[a-zA-Z0-9_]+=)/,
                    );
                    res.setHeader("set-cookie", cookiesArray);
                  }
                  return response;
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
