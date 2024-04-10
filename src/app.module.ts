import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { RabbitMqController } from './rabbit-mq/rabbit-mq.controller';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [NotificationModule],
  controllers: [RabbitMqController],
})
export class AppModule {}
