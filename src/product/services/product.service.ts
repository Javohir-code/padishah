import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { SubCategoryEntity } from 'src/subcategory/entities/subcategory.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getProductsList(): Promise<ProductEntity[]> {
    return await this.productRepository
      .createQueryBuilder('P')
      .leftJoin(CategoryEntity, 'C', 'C.categoryId = P.categoryId')
      .leftJoin(SubCategoryEntity, 'S', 'S.subCategoryId = P.subCategoryId')
      .select(['P', 'C.name AS categoryName', 'S.name AS subCategoryName'])
      .orderBy('P.createdAt', 'DESC')
      .getRawMany();
  }

  async getProductById(productId: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOneBy({ productId });
    if (!product) {
      throw new NotFoundException(
        `Product with productId: '${productId}' not found!`,
      );
    }
    return product;
  }
}
