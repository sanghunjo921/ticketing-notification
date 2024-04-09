import { Module } from '@nestjs/common';
import rabbitmqConfig from 'src/config/rabbitmq.config';
import { RabbitMQService } from './rabbit-mq.service';
import { RabbitMqController } from './rabbit-mq.controller';

@Module({
  providers: [],
  exports: [],
})
export class RabbitMQModule {}
