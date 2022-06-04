import { PaymentStatus } from 'src/product/enums/payment-status.enum';
import { ProductStatus } from 'src/product/enums/product-status.enum';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import * as moment from 'moment';

@Entity({ name: 'OrderMast' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column()
  userId: number;

  @Column()
  orders: string;

  @Column()
  totalPrice: number;

  @Column()
  location: string;

  @Column()
  paymentStatus: PaymentStatus;

  @Column()
  productStatus: ProductStatus;

  @Column({ default: 0 })
  refunded: number;

  @Column({ default: 'UZS' })
  currency: string;

  @Column({ default: 0 })
  paid: number;

  @Column({ default: 0 })
  cancelled: number;

  @Column()
  click_trans_id: number;

  @Column()
  createdAt: string;

  // HOOKS
  @BeforeInsert()
  getDefaults() {
    this.createdAt = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
  }
}
