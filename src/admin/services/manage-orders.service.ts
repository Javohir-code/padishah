import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetailsDto } from 'src/order/dto/order-details.dto';
import { OrderEntity } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/services/order.service';
import { Repository } from 'typeorm';

@Injectable()
export class ManageOrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private orderService: OrderService,
  ) {}
}
