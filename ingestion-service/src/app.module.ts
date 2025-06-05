import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [KafkaModule, OrdersModule],
})
export class AppModule {}
