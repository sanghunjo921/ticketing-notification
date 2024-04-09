import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { RabbitMqController } from './rabbit-mq/rabbit-mq.controller';

@Module({
  imports: [],
  controllers: [RabbitMqController],
})
export class AppModule {}
