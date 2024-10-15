/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { Logger } from '@nestjs/common/services/logger.service';
import { envs } from './common/config';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(envs.API_GATEWAY_PREFIX);

  await app.listen(envs.PORT);

  logger.log(`Gateway running on port ${envs.PORT}`);
}

bootstrap();
