import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryDto } from 'src/category/dto/category.dto';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { AdminJwtAuthGuard } from '../guards/admin-jwt-auth.guard';
import { ManageCategoriesService } from '../services/manage-categories.service';

@Controller()
export class ManageCategoriesController {
  constructor(private manageCategoryService: ManageCategoriesService) {}

  @Post('admin/add-category')
  @UseGuards(AdminJwtAuthGuard)
  async addCategory(@Body() categoryDto: CategoryDto): Promise<CategoryEntity> {
    const category = await this.manageCategoryService.addCategory(categoryDto);
    return category;
  }

  @Delete('admin/category/:categoryId')
  @UseGuards(AdminJwtAuthGuard)
  async removeCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<void> {
    await this.manageCategoryService.removeCategory(categoryId);
  }
}
