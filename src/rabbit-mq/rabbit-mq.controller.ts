import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class RabbitMqController {
  @MessagePattern('completedTransaction')
  async recievePurchaseData(@Payload() data: any, @Ctx() context: RmqContext) {
    try {
      console.log({ data, context });
      await this.processPayment();
      console.log(data);
    } catch (error) {}
  }

  private processPayment() {
    return new Promise<void>((resolve, reject) => {
      const waitTime = Math.floor(Math.random() * (30 - 10 + 1) + 10) * 1000;
      console.log(`Waiting for ${waitTime / 1000} seconds...`);
      setTimeout(() => {
        console.log(`Waiting for ${waitTime / 1000} seconds...`);
        resolve(); // Promise가 성공적으로 완료됨을 알림
      }, waitTime);
    });
  }
}
