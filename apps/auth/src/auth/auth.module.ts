import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthResolver } from "./auth.resolver";
import { User, userSchema } from "../user/entities/user.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { secret } from "@repo/common-auth";
import { AuthRepository } from "./auth.repository";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver } from "@nestjs/apollo";
import { Request, Response } from "express";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
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
    UserModule,
    JwtModule.register({
      global: true,
      secret: secret,
      signOptions: { expiresIn: "600s" },
    }),
  ],
  providers: [AuthService, AuthResolver, AuthRepository],
  exports: [AuthService],
})
export class AuthModule {}
