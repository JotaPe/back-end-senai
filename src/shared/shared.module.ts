import { Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { HttpErrorFilter } from './http-error.filter';

@Global()
@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class SharedModule {}
