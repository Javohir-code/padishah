import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import * as moment from 'moment';
import { Gender } from '../enums/gender.enum';

@Entity({ name: 'ProductMast' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  categoryId: number;

  @Column()
  subCategoryId: number;

  @Column()
  storeId: number;

  @Column()
  brandId: number;

  @Column()
  description: string;

  @Column()
  photos: string;

  @Column()
  keys: string;

  @Column()
  colors: string;

  @Column()
  vendorCode: number;

  @Column()
  productName: string;

  @Column()
  productType: string;

  @Column()
  gender: Gender;

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
  salePrice: number;

  @Column()
  salePercent: number;

  @Column()
  size: string;

  @Column()
  tags: string;

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
