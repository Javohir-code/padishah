import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import { CategoryDto } from 'src/category/dto/category.dto';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/services/category.service';
import { PhotosDto } from 'src/product/dto/photo.dto';
import { SubCategoryEntity } from 'src/subcategory/entities/subcategory.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ManageCategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(SubCategoryEntity)
    private subCategoryRepository: Repository<SubCategoryEntity>,
    private categoryService: CategoryService,
    @InjectAwsService(S3)
    private readonly s3Service: S3,
    private readonly configService: ConfigService,
  ) {}

  async addCategory(
    icon: PhotosDto,
    categoryDto: CategoryDto,
  ): Promise<CategoryEntity> {
    const uploadedResult = await this.s3Service
      .upload({
        Bucket: `${this.configService.get('awsS3Bucket')}/icons`,
        Body: icon.buffer,
        Key: `${Math.floor(Math.random() * 10000)}-${icon.originalname}`,
      })
      .promise();
    const newCategory = await this.categoryRepository.create();
    newCategory.name = categoryDto.name;
    newCategory.icon = uploadedResult.Location;
    newCategory.key = uploadedResult.Key;
    await this.categoryRepository.save(newCategory);
    return newCategory;
  }

  async removeCategory(categoryId: number): Promise<void> {
    const category = await this.categoryService.getCategoryById(categoryId);
    if (category) {
      await this.s3Service
        .deleteObject({
          Bucket: `${this.configService.get('awsS3Bucket')}/icons`,
          Key: category.key.substring(6),
        })
        .promise();
    }
    await this.categoryRepository.delete(category.categoryId);
    await this.subCategoryRepository.delete({
      categoryId: In([category.categoryId]),
    });
  }

  async updateCategory(
    icon?: PhotosDto,
    categoryId?: number,
    name?: string,
  ): Promise<CategoryEntity> {
    const category = await this.categoryService.getCategoryById(categoryId);
    if (icon) {
      await this.s3Service
        .deleteObject({
          Bucket: `${this.configService.get('awsS3Bucket')}/icons`,
          Key: category.key.substring(6),
        })
        .promise();

      const uploadedResult = await this.s3Service
        .upload({
          Bucket: `${this.configService.get('awsS3Bucket')}/icons`,
          Body: icon.buffer,
          Key: `${Math.floor(Math.random() * 10000)}-${icon.originalname}`,
        })
        .promise();
      category.name = name ? name : category.name;
      category.icon = uploadedResult.Location;
      category.key = uploadedResult.Key;
      return await this.categoryRepository.save({ ...category });
    }
    return await this.categoryRepository.save({ ...category, name });
  }
}
