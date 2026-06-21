import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CartModule } from "./cart/cart.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ["../../.env"],
      isGlobal: true,
    }),
    CartModule,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
