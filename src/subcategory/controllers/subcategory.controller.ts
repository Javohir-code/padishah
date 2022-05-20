import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SubCategoryEntity } from '../entities/subcategory.entity';
import { SubCategoryService } from '../services/subcategory.service';

@Controller('subcategory')
export class SubCategoryController {
  constructor(private subCategoryService: SubCategoryService) {}

  @Get('subcategories-list')
  async getSubCategories(): Promise<SubCategoryEntity[]> {
    return await this.subCategoryService.getSubCategories();
  }

  @Get(':subCategoryId')
  async getSubCategoryById(
    @Param('subCategoryId', ParseIntPipe) subCategoryId: number,
  ): Promise<SubCategoryEntity> {
    return await this.subCategoryService.getSubCategoryById(subCategoryId);
  }
}
