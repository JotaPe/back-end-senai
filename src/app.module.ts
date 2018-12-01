import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule } from 'nest-access-control';
import { ConfigModule, InjectConfig } from 'nestjs-config';

import { roles } from './app.roles';
import { ExerciseModule } from './exercise/exercise.module';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.load(),
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ headers: req.headers }),
    }),
    AccessControlModule.forRoles(roles),
    ExerciseModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [ExerciseModule, UserModule],
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
