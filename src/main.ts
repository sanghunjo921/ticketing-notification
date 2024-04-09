import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import rabbitmqConfig from './config/rabbitmq.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rabbitmqConfig.url],
        queue: rabbitmqConfig.queue,
      },
    },
  );

  await app.listen();
}
bootstrap();
