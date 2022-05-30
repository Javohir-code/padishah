import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from './controllers/brand.controller';
import { BrandEntity } from './entities/brand.entity';
import { BrandService } from './services/brand.service';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([BrandEntity])],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [TypeOrmModule.forFeature([BrandEntity]), BrandService],
})
export class BrandModule {}
