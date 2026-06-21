import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { registerEnumType } from "@nestjs/graphql";
import { Tag } from "@repo/common-types";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  registerEnumType(Tag, {
    name: "Tag",
  });
  const configService = app.get(ConfigService);
  await app.listen(configService.get<string>("PRODUCTS_PORT") || "");
}
void bootstrap();
