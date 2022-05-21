import { Controller, Get, Post } from '@nestjs/common';
import { StoreEntity } from '../entities/store.entity';
import { StoreService } from '../services/store.service';

@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get('store-list')
  async getStoreList(): Promise<StoreEntity[]> {
    return await this.storeService.getStoreList();
  }
}
