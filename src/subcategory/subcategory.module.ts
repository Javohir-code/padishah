import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoryController } from './controllers/subcategory.controller';
import { SubCategoryEntity } from './entities/subcategory.entity';
import { SubCategoryService } from './services/subcategory.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([SubCategoryEntity]),
  ],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
  exports: [TypeOrmModule.forFeature([SubCategoryEntity]), SubCategoryService],
})
export class SubCategoryModule {}
