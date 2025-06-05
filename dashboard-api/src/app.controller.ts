import { Controller, Get, Req, Param } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Request } from 'express';

@ApiTags('Dashboard')
@ApiHeader({
  name: 'X-RESTAURANT-ID',
  description: 'Restaurant context',
  required: true,
})
@Controller('orders')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get recent orders for a restaurant' })
  async recent(@Req() req: Request) {
    return this.appService.getRecentOrders(req.restaurantId!);
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: 'order_123' })
  @ApiOperation({ summary: 'Get order details' })
  async byId(@Req() req: Request, @Param('id') id: string) {
    return this.appService.getOrderDetails(req.restaurantId!, id);
  }
}
