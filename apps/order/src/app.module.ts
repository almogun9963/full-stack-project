import { Module } from "@nestjs/common";
import { OrderModule } from "./order/order.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
@Module({
  imports: [
    OrderModule,
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ["../../.env"],
          isGlobal: true,
        }),
      ],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>("MONGO_URI");
        return {
          uri: uri + "/products",
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
