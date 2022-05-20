import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './controllers/category.controller';
import { CategoryEntity } from './entities/category.entity';
import { CategoryService } from './services/category.service';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [TypeOrmModule.forFeature([CategoryEntity]), CategoryService],
})
export class CategoryModule {}
