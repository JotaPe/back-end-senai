import { Module, Global } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { MapperService } from './mapper/mapper.service';
import { DatabaseService } from './database/database.service';

@Global()
@Module({
  providers: [ConfigurationService, MapperService, DatabaseService]
})
export class SharedModule {}
