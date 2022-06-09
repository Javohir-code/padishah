import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from 'src/brand/entities/brand.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { StoreEntity } from 'src/store/entities/store.entity';
import { SubCategoryEntity } from 'src/subcategory/entities/subcategory.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>
  ) {}

  async getProductsList(
    page?: number,
    limit?: number
  ): Promise<ProductEntity[] | { products: ProductEntity[]; count: number }> {
    if (!page && !limit) {
      return await this.productRepository
        .createQueryBuilder('P')
        .leftJoin(CategoryEntity, 'C', 'C.categoryId = P.categoryId')
        .leftJoin(SubCategoryEntity, 'S', 'S.subCategoryId = P.subCategoryId')
        .leftJoin(StoreEntity, 'St', 'St.storeId = P.storeId')
        .leftJoin(BrandEntity, 'B', 'B.brandId = P.brandId')
        .select([
          'P.*',
          'C.name AS categoryName',
          'S.name AS subCategoryName',
          'St.name AS storeName',
          'B.name AS brandName'
        ])
        .orderBy('P.createdAt', 'DESC')
        .getRawMany();
    }

    const [products, count] = await Promise.all([
      this.productRepository
        .createQueryBuilder('P')
        .leftJoin(CategoryEntity, 'C', 'C.categoryId = P.categoryId')
        .leftJoin(SubCategoryEntity, 'S', 'S.subCategoryId = P.subCategoryId')
        .leftJoin(StoreEntity, 'St', 'St.storeId = P.storeId')
        .leftJoin(BrandEntity, 'B', 'B.brandId = P.brandId')
        .select([
          'P.*',
          'C.name AS categoryName',
          'S.name AS subCategoryName',
          'St.name AS storeName',
          'B.name AS brandName'
        ])
        .orderBy('P.createdAt', 'DESC')
        .offset(limit * (page - 1))
        .limit(limit)
        .getRawMany(),

      this.productRepository.count()
    ]);

    return { products: products, count: count };
  }

  async getProductById(productId: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOneBy({ productId });
    if (!product) {
      throw new NotFoundException(
        `Product with productId: '${productId}' not found!`
      );
    }
    return await this.productRepository
      .createQueryBuilder('P')
      .where('P.productId = :productId', { productId: product.productId })
      .leftJoin(StoreEntity, 'St', 'St.storeId = P.storeId')
      .leftJoin(CategoryEntity, 'C', 'C.categoryId = P.categoryId')
      .leftJoin(SubCategoryEntity, 'S', 'S.subCategoryId = P.subCategoryId')
      .leftJoin(BrandEntity, 'B', 'B.brandId = P.brandId')
      .select([
        'P.*',
        'St.name AS storeName',
        'C.name AS categoryName',
        'S.name AS subCategoryName',
        'B.name AS brandName'
      ])
      .getRawOne();
  }

  async getSimiliarProducts(subCategoryId: number): Promise<ProductEntity[]> {
    return await this.productRepository.find({
      where: { subCategoryId: subCategoryId },
      order: { createdAt: 'DESC' },
      take: 14
    });
  }
}
