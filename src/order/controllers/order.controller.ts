import { Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/global/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { IRequestUser } from 'src/user/interfaces/request-user.interface';
import { OrderEntity } from '../entities/order.entity';
import { OrderService } from '../services/order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('add-order')
  @UseGuards(JwtAuthGuard)
  async addOrder(@CurrentUser() user: IRequestUser) {
    console.log(typeof user);
  }
}
