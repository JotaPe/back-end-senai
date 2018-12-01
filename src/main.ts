import { ValidationPipe } from './shared/validation.pipe';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const hostDomain = AppModule.isDev
    ? `${AppModule.host}: ${AppModule.host}`
    : AppModule.host;

  const swaggerOptions = new DocumentBuilder()
    .setTitle(AppModule.name)
    .setDescription('API Docs')
    .setVersion(String(AppModule.version))
    .setHost(hostDomain.split('//')[1])
    .addBearerAuth('Authorization', 'header')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('/api/docs', app, swaggerDoc, {
    swaggerUrl: `${hostDomain}/api/docs-json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  });
  Logger.log('Swagger Loaded', 'Bootstrap');

  await app.listen(AppModule.port);
  Logger.log(
    `Server running on http://${AppModule.host}:${AppModule.port}`,
    'Bootstrap',
  );
}
// tslint:disable-next-line:no-console
bootstrap().catch(console.error);
