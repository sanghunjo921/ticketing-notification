import { Module } from '@nestjs/common';
import rabbitmqConfig from 'src/config/rabbitmq.config';
import { RabbitMQService } from './rabbit-mq.service';
import { RabbitMqController } from './rabbit-mq.controller';
import { NotificationModule } from 'src/notification/notification.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/entity/ticket.entity';
import { User } from 'src/entity/user.entity';
import { DiscountRate } from 'src/entity/discountRate.entity';
import { Transaction } from 'src/entity/transaction.entity';
import { Coupon } from 'src/entity/coupon.entity';
import { RefreshToken } from 'src/entity/refreshToken.entity';

@Module({
  imports: [
    NotificationModule,
    TypeOrmModule.forFeature([
      Ticket,
      Transaction,
      User,
      Coupon,
      DiscountRate,
      RefreshToken,
    ]),
  ],
  providers: [RabbitMQService],
  controllers: [RabbitMqController],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
