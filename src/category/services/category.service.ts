import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getCategories(): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find({
      order: { createdAt: -1 },
    });
    return categories;
  }

  async getCategoryById(categoryId: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOneBy({ categoryId });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }
}
