import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('api/public')
export class PublicController {
  private tips = ["No aceptes invitaciones de Juan Sao Ville", "Codea en comunidad"];
  private feedbacks: string[] = [];

  @Get('tips')
  getTips() {
    return this.tips;
  }

  @Post('feedback')
  postFeedback(@Body() dto: { text: string }) {
    this.feedbacks.push(dto.text);
    return { message: "Feedback recibido" };
  }
}