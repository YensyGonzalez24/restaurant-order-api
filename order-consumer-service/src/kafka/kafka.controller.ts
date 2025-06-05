import { Inject, Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { WriteRepository } from '../persistence/write.repository';
import { ReadRepository } from '../persistence/read.repository';
import { Order } from '../types';

@Injectable()
export class KafkaConsumer implements OnModuleInit {
  private readonly logger = new Logger(KafkaConsumer.name);

  constructor(
    @Inject('KAFKA') private readonly kafka: Kafka,
    private readonly write: WriteRepository,
    private readonly read: ReadRepository,
  ) {}

  async onModuleInit() {
    const consumer = this.kafka.consumer({ groupId: 'order-processor' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'orders', fromBeginning: false });
    this.logger.log('Subscribed to orders topic');

    await consumer.run({
      eachMessage: async ({ message }) => {
        this.logger.log(`New Message: ${message}`);

        const value = message.value?.toString() ?? '{}';
        const order: Order = JSON.parse(value);
        await this.write.insert(order);
        await this.read.upsertRecent(order);
      },
    });
  }
}
