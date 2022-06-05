import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductDetailsDto } from 'src/product/dto/product-details.dto';
import { ProductEntity } from 'src/product/entities/product.entity';
import { AdminJwtAuthGuard } from '../guards/admin-jwt-auth.guard';
import { ManageProductsService } from '../services/manage-products.service';

@Controller()
export class ManageProductsController {
  constructor(private manageProductsService: ManageProductsService) {}

  @Post('admin/add-product')
  @UseGuards(AdminJwtAuthGuard)
  @UseInterceptors(FilesInterceptor('photos'))
  async addProduct(
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Body() productDetailsDto: ProductDetailsDto,
  ): Promise<ProductEntity> {
    return await this.manageProductsService.addProduct(
      photos,
      productDetailsDto,
    );
  }

  @Delete('admin/product/:productId')
  @UseGuards(AdminJwtAuthGuard)
  async deleteProduct(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<void> {
    await this.manageProductsService.deleteProduct(productId);
  }

  @Delete('admin/delete/product/photo/:productId')
  async deleteProductPhoto(
    @Param('productId', ParseIntPipe) productId: number,
    @Body('url') productUrl: string,
  ): Promise<void> {
    await this.manageProductsService.deleteProductPhoto(productId, productUrl);
  }
}
