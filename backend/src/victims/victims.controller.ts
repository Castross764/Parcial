import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { VictimsService } from './victims.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('api/victims')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VictimsController {
  constructor(private victimsService: VictimsService) {}

  @Post()
  @Roles('SLAVE')
  create(@Body() dto: any, @Req() req) {
    return this.victimsService.create(dto, req.user.userId);
  }

  @Get()
  async findAll(@Req() req) {
    const { role, userId } = req.user;
    if (role === 'ADMIN') return this.victimsService.findAll();
    if (role === 'SLAVE') return this.victimsService.findBySlave(userId);
    if (role === 'DEV') return this.victimsService.findPublic();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.victimsService.findOne(+id);
  }

  @Put(':id')
  @Roles('SLAVE', 'ADMIN')
  update(@Param('id') id: string, @Body() dto: any, @Req() req) {
    return this.victimsService.update(+id, dto, req.user);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.victimsService.remove(+id);
  }
}