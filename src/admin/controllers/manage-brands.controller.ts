import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BrandDetailsDto } from 'src/brand/dto/branch-details.dto';
import { BrandEntity } from 'src/brand/entities/brand.entity';
import { AdminJwtAuthGuard } from '../guards/admin-jwt-auth.guard';
import { ManageBrandsService } from '../services/manage-brands.service';

@Controller()
export class ManageBrandsController {
  constructor(private manageBrandsService: ManageBrandsService) {}

  @Post('admin/add-brand')
  @UseGuards(AdminJwtAuthGuard)
  async addBrand(
    @Body() brandDetailsDto: BrandDetailsDto,
  ): Promise<BrandEntity> {
    return await this.manageBrandsService.addBrand(brandDetailsDto);
  }

  @Delete('admin/brand/:brandId')
  @UseGuards(AdminJwtAuthGuard)
  async removeBrand(
    @Param('brandId', ParseIntPipe) brandId: number,
  ): Promise<void> {
    await this.manageBrandsService.removeBrand(brandId);
  }
}
