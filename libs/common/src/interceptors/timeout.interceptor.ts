/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/interceptors/timeout.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, timeout, catchError } from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000),
      catchError((err) => {
        if (err.name === 'TimeoutError') {
          return throwError(
            () => new RequestTimeoutException('Request timeout exceeded'),
          );
        }
        return throwError(() => err);
      }),
    );
  }
}
