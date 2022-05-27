import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getOrderById(orderId: number): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      where: { orderId: orderId },
    });
    if (!order)
      throw new NotFoundException('order not found with given orderId');
    return order;
  }

  async getOrderList(): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.find({
      order: { createdAt: -1 },
    });

    return orders;
  }

  async deleteOrder(orderId: number): Promise<void> {
    const order = await this.getOrderById(orderId);
    await this.orderRepository.delete(order.orderId);
  }
}
