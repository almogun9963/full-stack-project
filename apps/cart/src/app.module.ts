import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { AppService } from "./app.service";
import { CartModule } from "./cart/cart.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    CartModule,
    MongooseModule.forRoot("mongodb://localhost:27017/products"),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
