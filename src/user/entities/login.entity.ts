import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import * as moment from 'moment';

@Entity({ name: 'LoginInfo' })
export class LoginEntity {
  @PrimaryGeneratedColumn()
  loginId: number;

  @Column()
  msisdn: string;

  @Column()
  code: number;

  @Column()
  createdAt: string;

  // HOOKS
  @BeforeInsert()
  getDefaults() {
    this.createdAt = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
  }
}
