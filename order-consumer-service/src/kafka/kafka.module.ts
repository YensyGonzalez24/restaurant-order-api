import { Module, Global } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Global()
@Module({
  providers: [
    {
      provide: 'KAFKA',
      useFactory: () => {
        const broker = 'kafka:9092';
        return new Kafka({
          clientId: 'processor-service',
          brokers: [broker],
          retry: {
            initialRetryTime: 300,
            retries: 10,
          },
        });
      },
    },
  ],
  exports: ['KAFKA'],
})
export class KafkaModule {}
