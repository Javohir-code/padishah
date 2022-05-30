import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductStatus } from 'src/product/enums/product-status.enum';
import { IRequestUser } from 'src/user/interfaces/request-user.interface';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { OrderDetailsDto } from '../dto/order-details.dto';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private userService: UserService,
  ) {}

  async addOrder(
    user: IRequestUser,
    orderDetailsDto: OrderDetailsDto,
  ): Promise<IRequestUser | OrderEntity> {
    const foundUser = await this.userService.findUserByMsisdn(user.msisdn);
    const newOrder = await this.orderRepository.create();
    newOrder.userId = foundUser.userId;
    newOrder.orders = JSON.stringify(orderDetailsDto.orders);
    newOrder.totalPrice = orderDetailsDto.totalPrice;
    newOrder.location = orderDetailsDto.location;
    newOrder.paymentStatus = orderDetailsDto.paymentStatus;
    newOrder.productStatus = ProductStatus.in_progress;

    await this.orderRepository.save(newOrder);

    return newOrder;
  }
}
