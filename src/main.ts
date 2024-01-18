import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Edusync Hub')
    .setDescription(
      'Project made for students search for subjects and subscribe.',
    )
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('v1/docs', app, document);

  app.enableCors({
    origin: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('v1/');
  await app.listen(+configService.get('APP_PORT') || 3000);
}
bootstrap();
