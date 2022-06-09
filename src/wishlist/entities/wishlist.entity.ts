import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import * as moment from 'moment';

@Entity({ name: 'WishlistMast' })
export class WishlistEntity {
  @PrimaryGeneratedColumn()
  wishId: number;

  @Column()
  productId: number;

  @Column()
  userId: number;

  @Column()
  createdAt: string;

  // HOOKS
  @BeforeInsert()
  getDefaults() {
    this.createdAt = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
  }
}
