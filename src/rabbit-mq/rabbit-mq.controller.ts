import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

import { RabbitMQService } from './rabbit-mq.service';

@Controller()
export class RabbitMqController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @MessagePattern('completedTransaction')
  async recievePurchaseData(@Payload() data: any, @Ctx() context: RmqContext) {
    try {
      console.log({ data, context });
      await this.rabbitMQService.processPayment();
      await this.rabbitMQService.purchaseComplete(data);
    } catch (error) {}
  }
}
