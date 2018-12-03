import { Module } from '@nestjs/common';
import { WarningController } from './warning.controller';
import { WarningService } from './warning.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarningEntity } from './warning.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WarningEntity])],
  controllers: [WarningController],
  providers: [WarningService],
})
export class WarningModule {}
