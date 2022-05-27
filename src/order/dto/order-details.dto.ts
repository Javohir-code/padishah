import { IsArray, IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PaymentStatus } from '../../product/enums/payment-status.enum';
import { ProductStatus } from '../../product/enums/product-status.enum';
import { IOrder } from '../interfaces/order.interface';

export class OrderDetailsDto {
  @IsArray()
  @IsNotEmpty()
  orders: Array<IOrder>;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsString()
  @IsIn([PaymentStatus.unpaid, PaymentStatus.pending, PaymentStatus.paid])
  paymentStatus: PaymentStatus;

  @IsString()
  @IsIn([
    ProductStatus.in_progress,
    ProductStatus.undelivered,
    ProductStatus.delivered,
  ])
  @IsNotEmpty()
  productStatus: ProductStatus;
}
