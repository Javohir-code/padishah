import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BrandEntity } from '../entities/brand.entity';
import { BrandService } from '../services/brand.service';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Get('brands-list')
  async getBrandsList(): Promise<BrandEntity[]> {
    return await this.brandService.getBrandsList();
  }

  @Get(':brandId')
  async getBrandById(
    @Param('brandId', ParseIntPipe) brandId: number,
  ): Promise<BrandEntity> {
    return await this.brandService.getBrandById(brandId);
  }
}
