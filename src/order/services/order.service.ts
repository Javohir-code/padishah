import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { ProductStatus } from 'src/product/enums/product-status.enum';
import { ProductService } from 'src/product/services/product.service';
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
    private productService: ProductService,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
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

    for (let i = 0; i < orderDetailsDto.orders.length; i++) {
      const product = await this.productService.getProductById(
        orderDetailsDto.orders[i].productId,
      );
      product.remainProducts -= orderDetailsDto.orders[i].quantity;
      await this.productRepository.save({
        ...product,
        remainProducts: product.remainProducts,
      });
    }

    await this.orderRepository.save(newOrder);

    return newOrder;
  }
}
