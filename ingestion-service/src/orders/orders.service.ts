import { Injectable } from '@nestjs/common';
import { KafkaService } from '../kafka/kafka.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrdersService {
  constructor(private readonly kafka: KafkaService) {}

  async create(dto: CreateOrderDto) {
    console.log('Creating order:', dto);

    const now = new Date().toISOString();
    const order = {
      id: uuid(),
      restaurantId: dto.restaurantId,
      value: dto.value,
      items: dto.items,
      createdAt: now,
    };
    await this.kafka.emit('orders', order);
    return order;
  }
}
