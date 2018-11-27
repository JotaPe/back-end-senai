import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { roles } from './app.roles';
import { AccessControlModule } from 'nest-access-control';
import { ConfigModule, InjectConfig } from 'nestjs-config';

import { ApiModule } from './api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.load(),
    TypeOrmModule.forRoot(),
    AccessControlModule.forRoles(roles),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static host: string;
  static port: number | string;
  static isDev: string;
  static projectName: string;
  static version: number;
  static tag: string;

  constructor(@InjectConfig() private readonly config) {
    AppModule.projectName = config.get('base.name');
    AppModule.version = config.get('base.version');
    AppModule.port = config.get('base.port') || 3000;
    AppModule.host = config.get('base.host') || 'localhost';
    AppModule.isDev = config.get('base.env') || 'development';
    AppModule.tag = config.get('base.tags');
  }

  private static normalizePort(param: number | string): number | string {
    const portNumber: number =
      typeof param === 'string' ? parseInt(param, 10) : param;
    if (isNaN(portNumber)) return param;
    else if (portNumber >= 0) return portNumber;
  }
}
