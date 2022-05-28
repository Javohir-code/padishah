import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PaginationParams } from 'src/global/dto/pagination.dto';
import { ProductEntity } from '../entities/product.entity';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('products-list')
  async getProductsList(
    @Query() { page, limit }: PaginationParams,
  ): Promise<ProductEntity[] | { products: ProductEntity[]; count: number }> {
    return await this.productService.getProductsList(page, limit);
  }

  @Get(':productId')
  async getProductById(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<ProductEntity> {
    return await this.productService.getProductById(productId);
  }
}
