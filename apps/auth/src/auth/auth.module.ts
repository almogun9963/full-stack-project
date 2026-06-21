import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { AuthResolver } from "./auth.resolver";
import { User, userSchema } from "../user/entities/user.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver } from "@nestjs/apollo";
import { Request, Response } from "express";
import { UserRepository } from "../user/user.repository";

import {
  RefreshTokenEntity,
  RefreshTokenSchema,
} from "../user/entities/refresh.token.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: userSchema },
      { name: RefreshTokenEntity.name, schema: RefreshTokenSchema },
    ]),
    GraphQLModule.forRoot({
      driver: ApolloFederationDriver,
      autoSchemaFile: { federation: 2 },
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
    }),
    UserModule,
  ],
  providers: [AuthService, AuthResolver, UserRepository],
  exports: [AuthService],
})
export class AuthModule {}
