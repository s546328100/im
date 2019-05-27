import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/responseInterceptor';
import { HttpExceptionFilter } from './common/exceptionFilters/http.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  console.log('test docker!!');
  await app.listen(3002);
}

bootstrap();
