import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from './kafka/kafka.module';
import { PersistenceModule } from './persistence/persistence.module';
import { KafkaConsumer } from './kafka/kafka.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KafkaModule,
    PersistenceModule,
  ],
  providers: [KafkaConsumer],
})
export class AppModule {}
