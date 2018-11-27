import { HttpErrorFilter } from './shared/http-error.filter';
import { Module } from '@nestjs/common';
import { ExerciseModule } from 'exercise/exercise.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from 'shared/logging.interceptor';
import { UserModule } from './user/user.module';


@Module({
  imports: [ExerciseModule, UserModule],
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
  exports: [ExerciseModule],
})
export class ApiModule {}
