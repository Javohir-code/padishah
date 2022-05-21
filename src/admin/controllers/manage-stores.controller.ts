import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StoreDetailsDto } from 'src/store/dto/store-details.dto';
import { StoreEntity } from 'src/store/entities/store.entity';
import { AdminJwtAuthGuard } from '../guards/admin-jwt-auth.guard';
import { ManageStoresService } from '../services/manage-stores.service';

@Controller()
export class ManageStoresController {
  constructor(private manageStoresService: ManageStoresService) {}

  @Post('admin/add-store')
  @UseGuards(AdminJwtAuthGuard)
  async addStore(
    @Body() storeDetailsDto: StoreDetailsDto,
  ): Promise<StoreEntity> {
    return await this.manageStoresService.addStore(storeDetailsDto);
  }

  @Delete('admin/store/:storeId')
  @UseGuards(AdminJwtAuthGuard)
  async deleteStore(
    @Param('storeId', ParseIntPipe) storeId: number,
  ): Promise<void> {
    await this.manageStoresService.deleteStore(storeId);
  }
}
