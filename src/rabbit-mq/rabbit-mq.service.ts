import { Injectable, Logger } from '@nestjs/common';
import { NotificationService } from 'src/notification/notification.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { Ticket } from 'src/entity/ticket.entity';

@Injectable()
export class RabbitMQService {
  constructor(
    private readonly notificationService: NotificationService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async processPayment() {
    return new Promise<void>((resolve, reject) => {
      const waitTime = Math.floor(Math.random() * (30 - 10 + 1) + 10) * 1000;
      console.log(`Waiting for ${waitTime / 1000} seconds...`);
      setTimeout(() => {
        resolve();
      }, waitTime);
    });
  }

  async purchaseComplete(data: any): Promise<string> {
    const user = await this.userRepository.findOne({
      where: {
        id: data.userId,
      },
    });
    const ticket = await this.ticketRepository.findOne({
      where: {
        id: data.ticketId,
      },
    });

    const discountAmount = ticket.price - data.totalPrice;

    const totalPriceFormatted = this.formatCurrency(data.totalPrice);
    const discountAmountFormatted = this.formatCurrency(discountAmount);

    const emailContent = `
    Dear Customer,<br/><br/>
    
    Thank you for your purchase of ${data.quantity} ticket(s) for ${ticket.title}.<br/>
    Below are the details of your purchase:<br/><br/>
    
    Ticket Title: ${ticket.title}<br/>
    Ticket Description: ${ticket.description}<br/>
    Quantity: ${data.quantity}<br/>
    Total Price: ${totalPriceFormatted}<br/>
    Discount Amount: ${discountAmountFormatted}<br/><br/>
    
    We appreciate your business and hope you enjoy the event.<br/><br/>
    
    Sincerely,<br/>
    Ticketing Team
  `;

    await this.notificationService.sendEmail(
      user.email,
      `Purchase Confirmation: ${ticket.title}`,
      emailContent,
    );
    return 'gg';
  }

  formatCurrency(amount: number) {
    return `KRW ${amount.toLocaleString()}`;
  }
}
