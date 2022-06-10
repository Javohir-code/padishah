import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PaginationParams } from 'src/global/dto/pagination.dto';
import { SortingParams } from 'src/global/dto/sorting.dto';
import { ProductEntity } from '../entities/product.entity';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('products-list')
  async getProductsList(
    @Query() { page, limit }: PaginationParams,
    @Query() { from, to, color, size, categoryId }: SortingParams
  ) {
    return await this.productService.getProductsList(
      page,
      limit,
      from,
      to,
      color,
      size,
      categoryId
    );
  }

  @Get(':productId')
  async getProductById(
    @Param('productId', ParseIntPipe) productId: number
  ): Promise<ProductEntity> {
    return await this.productService.getProductById(productId);
  }

  @Get('similiar/:subCategoryId')
  async getSimiliarProducts(
    @Param('subCategoryId', ParseIntPipe) subCategoryId: number
  ): Promise<ProductEntity[]> {
    return await this.productService.getSimiliarProducts(subCategoryId);
  }
}
