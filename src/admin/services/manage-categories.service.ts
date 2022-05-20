import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from 'src/category/dto/category.dto';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/services/category.service';
import { Repository } from 'typeorm';

@Injectable()
export class ManageCategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    private categoryService: CategoryService,
  ) {}

  async addCategory(categoryDto: CategoryDto): Promise<CategoryEntity> {
    const newCategory = await this.categoryRepository.create(categoryDto);
    await this.categoryRepository.save(newCategory);
    return newCategory;
  }

  async removeCategory(categoryId: number): Promise<void> {
    const category = await this.categoryService.getCategoryById(categoryId);
    await this.categoryRepository.delete(category.categoryId);
  }
}
