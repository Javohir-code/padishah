import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

import * as moment from 'moment';

@Entity({ name: 'TransactionMast' })
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  transactionId: number;

  @Column()
  orderId: number;

  @Column()
  userId: number;

  @Column()
  payme_tid: string;

  @Column()
  time: number;

  @Column()
  transaction: number;

  @Column()
  click_trans_id: number;

  @Column()
  merchant_trans_id: string;

  @Column()
  sign_time: string;

  @Column()
  sign_string: string;

  @Column()
  click_paydoc_id: number;

  @Column()
  amount: number;

  @Column()
  create_time: number;

  @Column({ default: 0 })
  perform_time: number;

  @Column({ default: 0 })
  cancel_time: number;

  @Column()
  reason: string;

  @Column({ default: 0 })
  state: number;

  @Column()
  refID: string;

  @Column({ default: 1 })
  active: number;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  //HOOKS
  @BeforeInsert()
  getDefaultInsert() {
    this.createdAt = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
  }

  @BeforeUpdate()
  getDefaultUpdate() {
    this.updatedAt = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
  }
}
