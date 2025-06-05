import { Injectable } from '@nestjs/common';
import { MongoProvider } from './persistence/mongo.provider';

@Injectable()
export class AppService {
  private collection;

  constructor(private readonly mongo: MongoProvider) {}

  private getCollection() {
    if (!this.collection) {
      this.collection = this.mongo.db.collection('orders_read');
    }
    return this.collection;
  }


  async getRecentOrders(restaurantId: string) {
    return this.getCollection()
      .find({ restaurantId })
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();
  }

  async getOrderDetails(restaurantId: string, orderId: string) {
    return this.getCollection().findOne({ restaurantId, orderId });
  }
}
