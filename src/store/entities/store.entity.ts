import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import * as moment from 'moment';

@Entity({ name: 'StoreMast' })
export class StoreEntity {
  @PrimaryGeneratedColumn()
  storeId: number;

  @Column()
  name: string;

  @Column()
  msisdn: string;

  @Column()
  telegram: string;

  @Column()
  addresses: string;

  @Column()
  createdAt: string;

  // HOOKS
  @BeforeInsert()
  getDefaults() {
    this.createdAt = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
  }
}
