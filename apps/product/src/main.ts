import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { registerEnumType } from "@nestjs/graphql";
import { Tag } from "@repo/common-types";
import { ConfigService } from "@nestjs/config";
import { Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  registerEnumType(Tag, {
    name: "Tag",
  });

  app.connectMicroservice(
    {
      transport: Transport.TCP,
      options: {
        host: "localhost",
        port: 3007,
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();

  await app.listen(configService.get<string>("PRODUCTS_PORT") || "");
}
void bootstrap();
