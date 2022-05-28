import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaginationParams } from 'src/global/dto/pagination.dto';
import { OrderEntity } from 'src/order/entities/order.entity';
import { AdminJwtAuthGuard } from '../guards/admin-jwt-auth.guard';
import { ManageOrdersService } from '../services/manage-orders.service';

@Controller()
export class ManageOrdersController {
  constructor(private manageOrdersService: ManageOrdersService) {}

  @Get('admin/order/:orderId')
  @UseGuards(AdminJwtAuthGuard)
  async getOrderById(
    @Param('orderId', ParseIntPipe) orderId: number,
  ): Promise<OrderEntity> {
    return await this.manageOrdersService.getOrderById(orderId);
  }

  @Get('admin/orders-list')
  @UseGuards(AdminJwtAuthGuard)
  async getOrderList(
    @Query() { page, limit }: PaginationParams,
  ): Promise<OrderEntity[] | { orders: OrderEntity[]; count: number }> {
    return await this.manageOrdersService.getOrderList(page, limit);
  }

  @Delete('admin/order/:orderId')
  @UseGuards(AdminJwtAuthGuard)
  async deleteOrder(
    @Param('orderId', ParseIntPipe) orderId: number,
  ): Promise<void> {
    return await this.manageOrdersService.deleteOrder(orderId);
  }
}
