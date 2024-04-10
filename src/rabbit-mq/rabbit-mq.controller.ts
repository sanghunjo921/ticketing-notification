import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { NotificationService } from 'src/notification/notification.service';

@Controller()
export class RabbitMqController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern('completedTransaction')
  async recievePurchaseData(@Payload() data: any, @Ctx() context: RmqContext) {
    try {
      console.log({ data, context });
      await this.processPayment();
      await this.purchaseComplete(data);
    } catch (error) {}
  }

  private processPayment() {
    return new Promise<void>((resolve, reject) => {
      const waitTime = Math.floor(Math.random() * (30 - 10 + 1) + 10) * 1000;
      console.log(`Waiting for ${waitTime / 1000} seconds...`);
      setTimeout(() => {
        resolve();
      }, waitTime);
    });
  }

  async purchaseComplete(data: any): Promise<string> {
    console.log(data);
    await this.notificationService.sendEmail(
      'salr921@naver.com',
      'Purchase is completed',
      'Purchase is completed Thanks',
    );
    return 'gg';
  }
}
