import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import process from "process";
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { useContainer } from "class-validator";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.PORT ?? 3004);
}
void bootstrap();
