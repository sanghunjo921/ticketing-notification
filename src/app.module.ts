import { Module } from '@nestjs/common';
import { RabbitMqController } from './rabbit-mq/rabbit-mq.controller';
import { NotificationModule } from './notification/notification.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/postgres.config';
import { RabbitMQModule } from './rabbit-mq/rabbit-mq.module';

@Module({
  imports: [
    RabbitMQModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    NotificationModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let typeOrmModuleOptions: TypeOrmModuleOptions = {
          type: configService.get('db.type'),
          host: configService.get('db.host'),
          port: configService.get('db.port'),
          database: configService.get('db.dbName'),
          username: configService.get('db.username'),
          password: configService.get('db.password'),
          autoLoadEntities: true,
        } as any;
        if (configService.get('STAGE') === 'dev') {
          console.log(typeOrmModuleOptions);
          typeOrmModuleOptions = Object.assign(typeOrmModuleOptions, {
            synchronize: true,
            logging: true,
          });
        }
        return typeOrmModuleOptions;
      },
    }),
  ],
  controllers: [RabbitMqController],
})
export class AppModule {}
