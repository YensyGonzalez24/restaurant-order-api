import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { connect, Connection } from 'mongoose';

@Injectable()
export class MongoProvider implements OnModuleInit {
  private conn: Connection;
  private readonly logger = new Logger(MongoProvider.name);

  get db(): Connection {
    return this.conn;
  }

  async onModuleInit() {
    const uri = 'mongodb://mongodb:27017/orders';
    const mongoose = await connect(uri);
    this.conn = mongoose.connection;
    this.logger.log(`Connected to MongoDB at ${uri}`);
  }
}
