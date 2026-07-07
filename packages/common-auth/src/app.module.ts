import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthGuard } from "./auth.guard.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ["../../.env"],
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        autoSchemaFile: true,
      }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
