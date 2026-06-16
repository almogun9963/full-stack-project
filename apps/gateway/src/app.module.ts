import { Module } from "@nestjs/common";
import { Request } from "express";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from "@nestjs/apollo";
import { IntrospectAndCompose, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        context: ({ req }: { req: Request }) => ({ headers: req.headers }),
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: "product", url: "http://localhost:3001/graphql" },
            { name: "cart", url: "http://localhost:3002/graphql" },
            { name: "order", url: "http://localhost:3003/graphql" },
            { name: "user", url: "http://localhost:3004/graphql" },
          ],
        }),
        buildService({ url }) {
          return new RemoteGraphQLDataSource<{
            headers?: Record<string, string>;
          }>({
            url,
            willSendRequest({
              request,
              context,
            }: {
              request?: {
                http?: { headers: { set(name: string, value: string): void } };
              };
              context?: { headers?: Record<string, string> };
            }) {
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
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
