import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  leaderboard() {
    return this.prisma.user.findMany({
      where: { role: 'SLAVE' },
      select: { id: true, name: true, _count: { select: { victims: true } } },
      orderBy: { victims: { _count: 'desc' } },
    });
  }

  slaveStats(id: number) {
    return this.prisma.victim.count({ where: { capturedById: id } });
  }
}