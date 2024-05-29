import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { LoggerService } from './logger.service';
import { IncomingMessage, ServerResponse } from 'http';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    morgan('combined', {
      stream: {
        write: (message) => this.logger.log(message.trim()),
      },
    })(req as unknown as IncomingMessage, res as unknown as ServerResponse, next);
  }
}
