import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.API_PORT ?? 3000;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    }),
  );

  await app.listen(port);
}
bootstrap();
