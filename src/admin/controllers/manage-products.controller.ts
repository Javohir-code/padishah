import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductDetailsDto } from 'src/product/dto/product-details.dto';
import { ProductEntity } from 'src/product/entities/product.entity';
import { ManageProductsService } from '../services/manage-products.service';

@Controller()
export class ManageProductsController {
  constructor(private manageProductsService: ManageProductsService) {}

  @Post('admin/add-product')
  @UseInterceptors(FilesInterceptor('files'))
  async addProduct(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() productDetailsDto: ProductDetailsDto,
  ): Promise<ProductEntity> {
    return await this.manageProductsService.addProduct(
      files,
      productDetailsDto,
    );
  }
}
