import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ProductStatus } from '../enums/product-status.enum';
import { PaymentStatus } from './payment-status.enum';
import * as moment from 'moment';

@Entity({ name: 'ProductMast' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  storeId: number;

  @Column()
  storeName: string;

  @Column()
  photos: string;

  @Column()
  colors: string;

  @Column()
  vendorCode: number;

  @Column()
  productName: string;

  @Column()
  gender: string;

  @Column()
  msisdn: string;

  @Column()
  telegram: string;

  @Column()
  storeAddress: string;

  @Column()
  deliveryCost: number;

  @Column()
  remainProducts: number;

  @Column()
  price: number;

  @Column()
  size: string;

  @Column()
  statusProduct: ProductStatus;

  @Column()
  statusPayment: PaymentStatus;

  @Column()
  material: string;

  @Column()
  manufacturerCountry: string;

  @Column()
  metadata: string;

  @Column()
  createdAt: string;

  // HOOKS
  @BeforeInsert()
  getDefaults() {
    this.createdAt = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
  }
}
