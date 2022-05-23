import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductEntity } from '../entities/product.entity';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('products-list')
  async getProductsList(): Promise<ProductEntity[]> {
    return await this.productService.getProductsList();
  }

  @Get(':productId')
  async getProductById(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<ProductEntity> {
    return await this.productService.getProductById(productId);
  }
}
