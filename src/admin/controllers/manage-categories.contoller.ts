import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryDto } from 'src/category/dto/category.dto';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { AdminJwtAuthGuard } from '../guards/admin-jwt-auth.guard';
import { ManageCategoriesService } from '../services/manage-categories.service';

@Controller()
export class ManageCategoriesController {
  constructor(private manageCategoryService: ManageCategoriesService) {}

  @Post('admin/add-category')
  @UseGuards(AdminJwtAuthGuard)
  @UseInterceptors(FileInterceptor('icon'))
  async addCategory(
    @UploadedFile() icon: Express.Multer.File,
    @Body() categoryDto: CategoryDto,
  ): Promise<CategoryEntity> {
    return await this.manageCategoryService.addCategory(icon, categoryDto);
  }

  @Delete('admin/category/:categoryId')
  @UseGuards(AdminJwtAuthGuard)
  async removeCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<void> {
    await this.manageCategoryService.removeCategory(categoryId);
  }

  @Post('admin/category/edit')
  @UseGuards(AdminJwtAuthGuard)
  @UseInterceptors(FileInterceptor('icon'))
  async updateCategory(
    @UploadedFile() icon: Express.Multer.File,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.manageCategoryService.updateCategory(
      icon,
      updateCategoryDto.categoryId,
      updateCategoryDto.name,
    );
  }
}
