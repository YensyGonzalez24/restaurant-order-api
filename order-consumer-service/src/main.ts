import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  await NestFactory.createApplicationContext(AppModule);
  new Logger('ProcessorService').log('Kafka consumer running');
}
bootstrap();
