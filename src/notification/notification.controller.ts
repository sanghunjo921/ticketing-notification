import { Body, Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly mailService: NotificationService) {}

  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('content') content: string,
  ) {
    await this.mailService.sendEmail(to, subject, content);
  }
}
