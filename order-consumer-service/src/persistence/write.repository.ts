import { Injectable } from '@nestjs/common';
import { MongoProvider } from './mongo.provider';
import { Order } from '../types';

@Injectable()
export class WriteRepository {
  private collection;

  constructor(private readonly mongo: MongoProvider) {}

  private getCollection() {
    if (!this.collection) {
      this.collection = this.mongo.db.collection('orders_write');
    }
    return this.collection;
  }

  async insert(order: Order) {
    await this.getCollection().insertOne(order as any);
  }
}
