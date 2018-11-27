import { HttpErrorFilter } from './shared/http-error.filter';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { UserModule } from './user/user.module';
import { ExerciseModule } from './exercise/exercise.module';
import { WarningModule } from './warning/warning.module';

@Module({
  imports: [ExerciseModule, UserModule, WarningModule],
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
