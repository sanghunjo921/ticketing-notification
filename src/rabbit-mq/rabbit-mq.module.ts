import { Module } from '@nestjs/common';
import rabbitmqConfig from 'src/config/rabbitmq.config';
import { RabbitMQService } from './rabbit-mq.service';
import { RabbitMqController } from './rabbit-mq.controller';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [],
  exports: [],
})
export class RabbitMQModule {}
