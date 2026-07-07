import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { registerEnumType } from "@nestjs/graphql";
import { Tag } from "@repo/common-types";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  registerEnumType(Tag, {
    name: "Tag",
  });

  await app.listen(configService.get<string>("CART_PORT") || "");
}
void bootstrap();
