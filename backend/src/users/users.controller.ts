import { Controller, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('api/users')
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  findAll() {
    return this.prisma.user.findMany({ select: { id: true, name: true, email: true, role: true } });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prisma.user.findUnique({ where: { id: Number(id) } });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.prisma.user.update({
      where: { id: Number(id) },
      data,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prisma.user.delete({ where: { id: Number(id) } });
  }
}