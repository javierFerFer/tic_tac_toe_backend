import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { env } from 'process';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: env.FRONT_URL, credentials: true } });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // somewhere in your initialization file
  app.use(cookieParser());


  const port = env.PORT || 3000;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
