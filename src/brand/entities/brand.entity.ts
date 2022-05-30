import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import * as moment from 'moment';

@Entity({ name: 'BrandMast' })
export class BrandEntity {
  @PrimaryGeneratedColumn()
  brandId: number;

  @Column()
  name: string;

  @Column()
  createdAt: string;

  // HOOKS
  @BeforeInsert()
  getDefaults() {
    this.createdAt = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
  }
}
