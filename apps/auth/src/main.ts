import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import process from 'process';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3004);
}
void bootstrap();
