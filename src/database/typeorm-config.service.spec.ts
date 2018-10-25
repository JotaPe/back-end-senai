import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmConfigService } from './type-orm-config-service.service';

describe('TypeOrmConfigService', () => {
  let service: TypeOrmConfigService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeOrmConfigService],
    }).compile();
    service = module.get<TypeOrmConfigService>(TypeOrmConfigService);
  });
  it('should return a sucessful connection to the db', () => {
    expect(service).toBeDefined();
  });
});
