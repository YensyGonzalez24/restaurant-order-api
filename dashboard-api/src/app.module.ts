import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantIdMiddleware } from './middleware/restaurantId.middleware';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [PersistenceModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RestaurantIdMiddleware).forRoutes('*');
  }
}
