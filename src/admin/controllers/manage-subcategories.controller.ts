import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SubCategoryDto } from 'src/subcategory/dto/subcategory.dto';
import { SubCategoryEntity } from 'src/subcategory/entities/subcategory.entity';
import { AdminJwtAuthGuard } from '../guards/admin-jwt-auth.guard';
import { ManageSubCategoriesService } from '../services/manage-subcategories.service';

@Controller()
export class ManageSubCategoriesController {
  constructor(private manageSubCategoriesService: ManageSubCategoriesService) {}

  @Post('admin/add-subcategory')
  @UseGuards(AdminJwtAuthGuard)
  async addSubCategory(
    @Body() subCategoryDto: SubCategoryDto,
  ): Promise<SubCategoryEntity> {
    return await this.manageSubCategoriesService.addSubCategory(subCategoryDto);
  }

  @Delete('admin/subcategory/:subCategoryId')
  @UseGuards(AdminJwtAuthGuard)
  async removeSubCategory(
    @Param('subCategoryId', ParseIntPipe) subCategoryId: number,
  ): Promise<void> {
    await this.manageSubCategoriesService.removeSubCategory(subCategoryId);
  }
}
