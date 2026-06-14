import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { OrderModule } from "./order/order.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    OrderModule,
    MongooseModule.forRoot("mongodb://localhost:27017/products"),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
