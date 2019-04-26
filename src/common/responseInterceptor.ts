import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: CallHandler<any>,
  ): Observable<any> {
    return call$.handle().pipe(
      map(response => {
        switch (typeof response) {
          case 'string':
          case 'number':
          case 'boolean':
            return { data: response };
          default:
            if (response.data) {
              return response;
            } else {
              return { data: response };
            }
        }
      }),
    );
  }
}
