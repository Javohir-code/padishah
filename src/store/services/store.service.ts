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

  async getStoreList(): Promise<StoreEntity[]> {
    const stores = await this.storeRepository.find({
      order: { createdAt: -1 },
    });
    return stores;
  }
}
