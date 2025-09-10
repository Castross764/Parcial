import { Module } from '@nestjs/common';
import { VictimsController } from './victims.controller';
import { VictimsService } from './victims.service';

@Module({
  controllers: [VictimsController],
  providers: [VictimsService]
})
export class VictimsModule {}
