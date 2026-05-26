import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
@Module({
  imports: [CartModule, MongooseModule.forRoot('mongodb://localhost')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
