import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreDetailsDto } from 'src/store/dto/store-details.dto';
import { StoreEntity } from 'src/store/entities/store.entity';
import { StoreService } from 'src/store/services/store.service';
import { Repository } from 'typeorm';

@Injectable()
export class ManageStoresService {
  constructor(
    @InjectRepository(StoreEntity)
    private storeRepository: Repository<StoreEntity>,
    private storeService: StoreService,
  ) {}

  async addStore(storeDetailsDto: StoreDetailsDto): Promise<StoreEntity> {
    const newStore = await this.storeRepository.create();
    newStore.name = storeDetailsDto.name;
    newStore.msisdn = storeDetailsDto.msisdn;
    newStore.telegram = storeDetailsDto.telegram;
    newStore.addresses = JSON.stringify(storeDetailsDto.addresses);
    await this.storeRepository.save(newStore);
    return newStore;
  }

  async deleteStore(storeId: number): Promise<void> {
    const store = await this.storeService.getStoreById(storeId);
    await this.storeRepository.delete(store.storeId);
  }
}
