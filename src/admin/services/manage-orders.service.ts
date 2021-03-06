import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/services/order.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManageOrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private orderService: OrderService,
  ) {}

  async getOrderById(orderId: number): Promise<OrderEntity> {
    const order = await this.orderRepository
      .createQueryBuilder('O')
      .leftJoin(UserEntity, 'U', 'U.userId = O.userId')
      .select([
        'O.orderId AS orderId',
        'O.orders AS orders',
        'O.totalPrice AS totalPrice',
        'O.location AS location',
        'O.paymentStatus AS paymentStatus',
        'O.productStatus AS productStatus',
        'O.createdAt AS createdAt',
        'U.fullName AS fullName',
        'U.msisdn AS msisdn',
        'U.region AS region',
        'U.district AS district',
        'U.address AS address',
        'U.address2 AS address2',
      ])
      .where('O.orderId = :orderId', { orderId })
      .getRawOne();
    if (!order)
      throw new NotFoundException('order not found with given orderId');
    return order;
  }

  async getOrderList(
    page?: number,
    limit?: number,
  ): Promise<OrderEntity[] | { orders: OrderEntity[]; count: number }> {
    if (!page && !limit) {
      return await this.orderRepository.find({
        order: { createdAt: 'DESC' },
      });
    }

    const orders = await this.orderRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: limit * (page - 1),
      take: limit,
    });

    return { orders: orders[0], count: orders[1] };
  }

  async deleteOrder(orderId: number): Promise<void> {
    const order = await this.getOrderById(orderId);
    await this.orderRepository.delete(order.orderId);
  }
}
