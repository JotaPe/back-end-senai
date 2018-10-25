import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from 'nestjs-config';
import { Connection } from 'typeorm';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [SharedModule, ConfigModule.load(), DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
