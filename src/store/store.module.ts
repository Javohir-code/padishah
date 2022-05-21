import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreController } from './controllers/store.controller';
import { StoreEntity } from './entities/store.entity';
import { StoreService } from './services/store.service';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([StoreEntity])],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [TypeOrmModule.forFeature([StoreEntity]), StoreService],
})
export class StoreModule {}
