import { Test, TestingModule } from '@nestjs/testing';
import { EposidesService } from './eposides.service';

describe('EposidesService', () => {
  let service: EposidesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EposidesService],
    }).compile();

    service = module.get<EposidesService>(EposidesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
