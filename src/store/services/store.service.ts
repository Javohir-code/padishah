import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreEntity } from '../entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private storeRepository: Repository<StoreEntity>,
  ) {}

  async getStoreById(storeId: number): Promise<StoreEntity> {
    const store = await this.storeRepository.findOneBy({ storeId });
    if (!store) throw new NotFoundException('Store Not Found!');

    return store;
  }

  async getStoreList(
    page?: number,
    limit?: number,
  ): Promise<StoreEntity[] | { stores: StoreEntity[]; count: number }> {
    if (!page && !limit) {
      return await this.storeRepository.find({ order: { createdAt: 'DESC' } });
    }
    const stores = await this.storeRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: limit * (page - 1),
      take: limit,
    });

    return { stores: stores[0], count: stores[1] };
  }
}
