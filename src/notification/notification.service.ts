import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      port: 587,
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    console.log({ to, subject, text });
    console.log(process.env.EMAIL_USERNAME, process.env.EMAIL_PASSWORD);
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      text,
    };
    try {
      await this.transporter.sendMail(mailOptions);
      console.log('email sent successfully');
    } catch (error) {
      console.error('email sent error', error);
    }
  }
}
