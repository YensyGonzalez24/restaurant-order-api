import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly svc: OrdersService) {}

  @Post()
  @ApiBody({ type: CreateOrderDto })
  @ApiCreatedResponse({ description: 'Order created and published to Kafka' })
  create(@Body() dto: CreateOrderDto) {
    return this.svc.create(dto);
  }
}
