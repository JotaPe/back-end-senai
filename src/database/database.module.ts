import { Module } from '@nestjs/common';
import { TypeOrmService } from './type-orm.service';

@Module({
  providers: [TypeOrmService]
})
export class DatabaseModule {}
