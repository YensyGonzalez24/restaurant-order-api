import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private readonly logger = new Logger(KafkaService.name);
  private producer: Producer;

  async onModuleInit() {
    const broker = 'kafka:9092';
    const kafka = new Kafka({
      clientId: 'ingestion-service',
      brokers: [broker],
      retry: {
        initialRetryTime: 300,
        retries: 10,
      },
    });
    this.producer = kafka.producer();
    await this.producer.connect();
    this.logger.log('Kafka producer connected');
  }

  async emit(topic: string, message: object) {
    const result = await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message), partition: 0 }],
    });

    console.log(result);
  }

  logReady() {
    this.logger.log('HTTP server listening on port 3001');
  }
}
