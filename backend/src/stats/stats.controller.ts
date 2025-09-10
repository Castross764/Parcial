import { Controller, Get, Param } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('api/stats')
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get('leaderboard')
  leaderboard() {
    return this.statsService.leaderboard();
  }

  @Get('slaves/:id')
  slaveStats(@Param('id') id: string) {
    return this.statsService.slaveStats(+id);
  }
}