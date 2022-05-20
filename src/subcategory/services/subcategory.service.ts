import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubCategoryEntity } from '../entities/subcategory.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategoryEntity)
    private subCategoryRepository: Repository<SubCategoryEntity>,
  ) {}

  async getSubCategories(): Promise<SubCategoryEntity[]> {
    const subCategories = await this.subCategoryRepository.find({
      order: { createdAt: -1 },
    });
    return subCategories;
  }

  async getSubCategoryById(subCategoryId: number): Promise<SubCategoryEntity> {
    const subCategory = await this.subCategoryRepository.findOneBy({
      subCategoryId,
    });
    if (!subCategory) {
      throw new NotFoundException('SubCategory Not Found!');
    }
    return subCategory;
  }
}
