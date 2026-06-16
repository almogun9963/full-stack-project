import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { join } from "path";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        join(process.cwd(), ".env"),
        join(__dirname, "..", "..", "..", ".env"),
      ],
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    MongooseModule.forRoot("mongodb://localhost:27017/auth"),

    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>("JWT_SECRET");
        if (!secret) {
          console.error("no secret");
        }
        return {
          secret: secret,
          signOptions: { expiresIn: "600s" },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
