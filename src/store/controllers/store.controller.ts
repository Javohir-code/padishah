import { Controller, Get, Post, Query } from '@nestjs/common';
import { PaginationParams } from 'src/global/dto/pagination.dto';
import { StoreEntity } from '../entities/store.entity';
import { StoreService } from '../services/store.service';

@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get('store-list')
  async getStoreList(
    @Query() { page, limit }: PaginationParams,
  ): Promise<StoreEntity[] | { stores: StoreEntity[]; count: number }> {
    return await this.storeService.getStoreList(page, limit);
  }
}
