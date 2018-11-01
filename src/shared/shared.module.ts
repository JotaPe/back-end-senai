import { Module, Global } from '@nestjs/common';
import { MapperService } from './mapper/mapper.service';
import { ConfigService } from './config/config.service';

@Global()
@Module({
  providers: [MapperService, ConfigService],
  exports: [MapperService],
})
export class SharedModule {}
