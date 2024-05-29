import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from '@shared/interceptors/transform.interceptor';
import { corsConfig } from '@config/cors.config';
import { ValidationConfig } from '@config/validation.config';
import { NODE_ENV_DEV } from '@shared/constants/common.constant';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);

  // Config Validation
  app.useGlobalPipes(new ValidationPipe(ValidationConfig));

  // Config JWT
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // Transform Response
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  // Config CORS
  app.enableCors(corsConfig);

  // Config Global Prefix
  app.setGlobalPrefix('api');

  // Config Swagger
  if (configService.get<string>('NODE_ENV') === NODE_ENV_DEV) {
    const config = new DocumentBuilder()
      .setTitle('Onsen API')
      .setDescription('The API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger/api', app, document);
  }

  await app.listen(1367);
}
bootstrap();
