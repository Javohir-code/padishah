import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from 'src/order/order.module';
import configuration from '../global/config/config';
import { ClickController } from './click/controllers/click.controller';
import { ClickService } from './click/services/click.service';
import { TransactionEntity } from './entities/transaction.entity';
import { PaymeController } from './payme/controllers/payme.controller';
import { PaymeService } from './payme/services/payme.service';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forFeature([TransactionEntity]),
    OrderModule
  ],
  controllers: [ClickController, PaymeController],
  providers: [ClickService, PaymeService],
  exports: [TypeOrmModule.forFeature([TransactionEntity]), ClickService, PaymeService],
})
export class TransactionModule {}
