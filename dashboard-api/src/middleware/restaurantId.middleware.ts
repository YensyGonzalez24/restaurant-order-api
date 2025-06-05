import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    restaurantId?: string;
  }
}

@Injectable()
export class RestaurantIdMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction): void {
    const header = req.header('X-RESTAURANT-ID');
    if (!header) {
      throw new BadRequestException('X-RESTAURANT-ID header missing');
    }
    req.restaurantId = header;
    next();
  }
}
