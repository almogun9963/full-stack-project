import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { registerEnumType } from "@nestjs/graphql";
import { Tag } from "@repo/common-types";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  registerEnumType(Tag, {
    name: "Tag",
  });

  await app.listen(3001);
}
void bootstrap();
