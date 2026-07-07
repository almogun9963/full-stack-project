import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ["../../.env"],
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>("MONGO_URI");
        return {
          uri: uri + "/store",
        };
      },
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
  controllers: [],
  providers: [],
})
export class AppModule {}
