import { Module, Global } from '@nestjs/common';
import { MongoProvider } from './mongo.provider';
import { WriteRepository } from './write.repository';
import { ReadRepository } from './read.repository';

@Global()
@Module({
  providers: [MongoProvider, WriteRepository, ReadRepository],
  exports: [WriteRepository, ReadRepository],
})
export class PersistenceModule {}
