import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

export interface IResponseError {
  code: number;
  message: string;
  detail?: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus();
    const error: Partial<IResponseError> = {};
    error.code = status;
    response.status(status);
    switch (status) {
      case 401:
        error.message = '用户未登陆';
        error.detail = '';
        break;
      case 404:
        error.message = '页面不存在';
        error.detail = '';
        break;
    }
    response.json({ error });
  }
}
