import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BrandDetailsDto } from 'src/brand/dto/branch-details.dto';
import { BrandEntity } from 'src/brand/entities/brand.entity';
import { ManageBrandsService } from '../services/manage-brands.service';

@Controller()
export class ManageBrandsController {
  constructor(private manageBrandsService: ManageBrandsService) {}

  @Post('admin/add-brand')
  async addBrand(
    @Body() brandDetailsDto: BrandDetailsDto,
  ): Promise<BrandEntity> {
    return await this.manageBrandsService.addBrand(brandDetailsDto);
  }

  @Delete('admin/brand/:brandId')
  async removeBrand(
    @Param('brandId', ParseIntPipe) brandId: number,
  ): Promise<void> {
    await this.manageBrandsService.removeBrand(brandId);
  }
}
