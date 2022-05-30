import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandEntity } from '../entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>,
  ) {}

  async getBrandsList(): Promise<BrandEntity[]> {
    return await this.brandRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getBrandById(brandId: number): Promise<BrandEntity> {
    const brand = await this.brandRepository.findOneBy({ brandId });
    if (!brand) {
      throw new NotFoundException('Brand with given Id not found...');
    }
    return brand;
  }
}
