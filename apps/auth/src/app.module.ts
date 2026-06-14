import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    UserModule,
    AuthModule,
    MongooseModule.forRoot("mongodb://localhost:27017/auth"),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
