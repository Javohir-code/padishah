import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { OrderController } from './controllers/order.controller';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './services/order.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([OrderEntity]),
    UserModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [TypeOrmModule.forFeature([OrderEntity]), OrderService],
})
export class OrderModule {}
