import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private logger: winston.Logger;

  constructor(context: string) {
    super(context);

    this.logger = winston.createLogger({
      transports: [
        new DailyRotateFile({
          level: 'info',
          dirname: `logs/${process.env.NODE_ENV || 'app'}/info`,
          filename: '%DATE%-info.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(
              (info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`,
            ),
          ),
        }),
        new DailyRotateFile({
          level: 'error',
          dirname: `logs/${process.env.NODE_ENV || 'app'}/error`,
          filename: '%DATE%-error.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(
              (info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`,
            ),
          ),
        }),
      ],
      exceptionHandlers: [
        new DailyRotateFile({
          filename: 'logs/exceptions/%DATE%-exceptions.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(
              (info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`,
            ),
          ),
        }),
      ],
      rejectionHandlers: [
        new DailyRotateFile({
          filename: 'logs/rejection/%DATE%-rejection.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.printf(
              (info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`,
            ),
          ),
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(`${message} - ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
