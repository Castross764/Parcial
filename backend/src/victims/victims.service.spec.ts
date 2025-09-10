import { Test, TestingModule } from '@nestjs/testing';
import { VictimsService } from './victims.service';

describe('VictimsService', () => {
  let service: VictimsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VictimsService],
    }).compile();

    service = module.get<VictimsService>(VictimsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
