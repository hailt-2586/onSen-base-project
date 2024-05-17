import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from '@shared/interceptors/transform.interceptor';
import { corsConfig } from '@config/cors.config';
import { ValidationPipe } from '@nestjs/common';
import { ValidationConfig } from '@config/validation.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  // Config Validation
  app.useGlobalPipes(new ValidationPipe(ValidationConfig));

  // Transform Response
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  // Config CORS
  app.enableCors(corsConfig);

  // Config Global Prefix
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
