import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandDetailsDto } from 'src/brand/dto/branch-details.dto';
import { BrandEntity } from 'src/brand/entities/brand.entity';
import { BrandService } from 'src/brand/services/brand.service';
import { Repository } from 'typeorm';

@Injectable()
export class ManageBrandsService {
  constructor(
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,
    private brandService: BrandService,
  ) {}

  async addBrand(brandDetailsDto: BrandDetailsDto): Promise<BrandEntity> {
    const newBrand = await this.brandRepository.create(brandDetailsDto);
    await this.brandRepository.save(newBrand);
    return newBrand;
  }

  async removeBrand(brandId: number): Promise<void> {
    const brand = await this.brandService.getBrandById(brandId);
    await this.brandRepository.delete(brand.brandId);
  }
}
