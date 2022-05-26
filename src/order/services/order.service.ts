import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRequestUser } from 'src/user/interfaces/request-user.interface';
import { Repository } from 'typeorm';
import { OrderDetailsDto } from '../dto/order-details.dto';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  // async addOrder(
  //   user: IRequestUser,
  //   orderDetailsDto: OrderDetailsDto,
  // ): Promise<IRequestUser | OrderEntity> {

  // }
}
