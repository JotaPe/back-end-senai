import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './type-orm-config-service.service';

@Module({
    imports: [TypeOrmModule.forRootAsync({useClass: TypeOrmConfigService})],
})
export class DatabaseModule {}
