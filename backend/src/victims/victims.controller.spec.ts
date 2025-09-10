import { Test, TestingModule } from '@nestjs/testing';
import { VictimsController } from './victims.controller';

describe('VictimsController', () => {
  let controller: VictimsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VictimsController],
    }).compile();

    controller = module.get<VictimsController>(VictimsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
