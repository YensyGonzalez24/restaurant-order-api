import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { connect, Connection } from 'mongoose';

@Injectable()
export class MongoProvider implements OnModuleInit {
  private connection: Connection;
  private readonly logger = new Logger(MongoProvider.name);

  get db(): Connection {
    return this.connection;
  }

  async onModuleInit() {
    const uri = 'mongodb://mongodb:27017/orders';
    const conn = await connect(uri);
    this.connection = conn.connection;
    this.logger.log(`Connected to MongoDB at ${uri}`);
  }
}
