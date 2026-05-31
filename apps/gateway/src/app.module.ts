import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        context: ({ req }) => ({ headers: req.headers }),
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'product', url: 'http://localhost:3001/graphql' },
            { name: 'cart', url: 'http://localhost:3002/graphql' },
            { name: 'order', url: 'http://localhost:3003/graphql' },
            { name: 'user', url: 'http://localhost:3004/graphql' },
          ],
        }),
        buildService({ url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              const incomingHeaders = (context as any).headers;

              if (incomingHeaders) {
                if (incomingHeaders.authorization) {
                  request?.http?.headers.set(
                    'authorization',
                    incomingHeaders.authorization,
                  );
                }
              }
            },
          });
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
