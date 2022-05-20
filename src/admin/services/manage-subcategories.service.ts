import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategoryDto } from 'src/subcategory/dto/subcategory.dto';
import { SubCategoryEntity } from 'src/subcategory/entities/subcategory.entity';
import { SubCategoryService } from 'src/subcategory/services/subcategory.service';
import { Repository } from 'typeorm';

@Injectable()
export class ManageSubCategoriesService {
  constructor(
    @InjectRepository(SubCategoryEntity)
    private subCategoryRepository: Repository<SubCategoryEntity>,
    private subCategoryService: SubCategoryService,
  ) {}

  async addSubCategory(
    subCategoryDto: SubCategoryDto,
  ): Promise<SubCategoryEntity> {
    const newSubCategory = await this.subCategoryRepository.create(
      subCategoryDto,
    );
    await this.subCategoryRepository.save(newSubCategory);
    return newSubCategory;
  }

  async removeSubCategory(subCategoryId: number): Promise<void> {
    const subCategory = await this.subCategoryService.getSubCategoryById(
      subCategoryId,
    );
    await this.subCategoryRepository.delete(subCategory.subCategoryId);
  }
}
