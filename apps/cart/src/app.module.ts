import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { AppService } from "./app.service";
import { CartModule } from "./cart/cart.module";
import { ConfigModule } from "@nestjs/config";
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
    CartModule,
    ConfigModule,
    MongooseModule.forRoot("mongodb://localhost:27017/products"),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
