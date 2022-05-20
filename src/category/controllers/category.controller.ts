import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryService } from '../services/category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('categories-list')
  async getCategories(): Promise<CategoryEntity[]> {
    return await this.categoryService.getCategories();
  }

  @Get(':categoryId')
  async getCategoryById(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<CategoryEntity> {
    return await this.categoryService.getCategoryById(categoryId);
  }
}
