import { Injectable } from '@nestjs/common';
import { MongoProvider } from './mongo.provider';
import { Order } from '../types';

@Injectable()
export class ReadRepository {
  private collection;

  constructor(private readonly mongo: MongoProvider) {}

  private async getCollection() {
    if (!this.collection) {
      this.collection = this.mongo.db.collection('orders_read');
      await this.collection
        .createIndex({ restaurantId: 1, createdAt: -1 })
        .catch(() => {});
    }
    return this.collection;
  }

  async upsertRecent(order: Order) {
    const collection = await this.getCollection();
    await collection.updateOne(
      { orderId: order.id },
      { $set: { ...order, orderId: order.id } },
      { upsert: true },
    );
  }
}
