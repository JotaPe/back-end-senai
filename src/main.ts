import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const mainOptions = new DocumentBuilder()
    .setTitle(AppModule.projectName)
    .setDescription('Main API Documentation')
    .setVersion(String(AppModule.version))
    .addTag(AppModule.tag)
    .build();
  const mainDocument = SwaggerModule.createDocument(app, mainOptions);
  SwaggerModule.setup('api/docs', app, mainDocument);

  const userOptions = new DocumentBuilder()
    .setTitle(AppModule.projectName)
    .setDescription('User API Documentation')
    .setVersion(String(AppModule.version))
    .addTag(AppModule.tag)
    .build();
  const userDocument = SwaggerModule.createDocument(app, userOptions);
  SwaggerModule.setup('api/docs/user/', app, userDocument);

  await app.listen(AppModule.port);
  Logger.log(`Server running on http://${AppModule.host}:${AppModule.port}`, 'Bootstrap');
}
bootstrap();
