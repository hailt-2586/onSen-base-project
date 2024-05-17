import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { RESPONSE_MESSAGE } from '@shared/decorators/common.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: this.reflector.get<string>(RESPONSE_MESSAGE, context.getHandler()) || '',
        data: data,
      })),
      catchError((err) => {
        const status =
          err instanceof HttpException ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const response = err.response || {
          statusCode: status,
          message: 'Unexpected error occurred',
          error: 'Internal Server Error',
        };

        return throwError(
          () =>
            new HttpException(
              {
                statusCode: response.statusCode || status,
                message: response.message,
                error: response.error || response.message,
              },
              status,
            ),
        );
      }),
    );
  }
}
