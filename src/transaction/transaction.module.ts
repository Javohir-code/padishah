import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../global/config/config';
import { ClickController } from './click/controllers/click.controller';
import { ClickService } from './click/services/click.service';
import { TransactionEntity } from './entities/transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forFeature([TransactionEntity]),
  ],
  controllers: [ClickController],
  providers: [ClickService],
  exports: [TypeOrmModule.forFeature([TransactionEntity]), ClickService],
})
export class TransactionModule {}
