import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getProductsList(): Promise<ProductEntity[]> {
    const products = await this.productRepository.find({
      order: { createdAt: -1 },
    });

    return products;
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
