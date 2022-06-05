import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { Repository } from 'typeorm';
import md5 from 'md5';
import { ClickPayload } from '../interfaces/click-payload.interface';

@Injectable()
export class ClickService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    private configService: ConfigService
  ) {}

  verifyHash(clickPayload: ClickPayload) {
    console.log('clickPayload', clickPayload);
    console.log('click_trans_id', clickPayload.click_trans_id);
    console.log('service_id', clickPayload.service_id);
    console.log(
      'click_service_id',
      this.configService.get('click_service.secret_key')
    );
    console.log('merchant_trans_id', clickPayload.merchant_trans_id);
    console.log('amount', clickPayload.amount);
    console.log('action', clickPayload.action);
    console.log('sign_time', clickPayload.sign_time);
    const hash = md5(
        clickPayload.click_trans_id +
        clickPayload.service_id +
        this.configService.get('click_service.secret_key') +
        clickPayload.merchant_trans_id +
        clickPayload.amount +
        clickPayload.action +
        clickPayload.sign_time
    );
    console.log('hash', hash);
    console.log('status: ', hash == clickPayload.sign_string);
    return hash === clickPayload.sign_string;
  }

  verifyHashComplete(clickPayload) {
    console.log('clickPayload', clickPayload);
    console.log('click_trans_id', clickPayload.click_trans_id);
    console.log('service_id', clickPayload.service_id);
    console.log(
      'CLICK_SECRET_KEY',
      this.configService.get('click_service.secret_key')
    );
    console.log('merchant_trans_id', clickPayload.merchant_trans_id);
    console.log('merchant_prepare_id', clickPayload.merchant_prepare_id);
    console.log('amount', clickPayload.amount);
    console.log('action', clickPayload.action);
    console.log('sign_time', clickPayload.sign_time);
    clickPayload.click_trans_id = parseInt(clickPayload.click_trans_id);
    clickPayload.service_id = parseInt(clickPayload.service_id);
    clickPayload.amount = parseFloat(clickPayload.amount);
    clickPayload.action = parseInt(clickPayload.action);
    const hash = md5(
      clickPayload.click_trans_id +
        clickPayload.service_id +
        this.configService.get('click_service.secret_key') +
        clickPayload.merchant_trans_id +
        clickPayload.merchant_prepare_id +
        clickPayload.amount +
        clickPayload.action +
        clickPayload.sign_time
    );
    console.log('hash', hash);
    return hash === clickPayload.sign_string;
  }

  verifyRequest(payload) {
    let error;
    if (!payload || JSON.stringify(payload) === '{}') {
      error = {
        code: 400,
        message: 'Unacceptable params provided',
        name: 'client'
      };
    }
    if (+payload.error < 0) {
      error = {
        code: 500,
        message: payload.error_note || 'Something went wrong, payment failed'
      };
    }
    if (!this.verifyHash(payload)) {
      error = {
        name: 'payment',
        message: 'Access denied. Invalid signature',
        paymentCode: -1
      };
    }
    return error;
  }

  verifyRequestComplete(payload) {
    console.log('...verifyRequestComplete');
    let error;
    if (!payload || JSON.stringify(payload) === '{}') {
      error = {
        code: 400,
        message: 'Unacceptable params provided',
        name: 'client'
      };
    }
    if (+payload.error < 0) {
      error = {
        code: 500,
        message: payload.error_note || 'Something went wrong, payment failed'
      };
    }
    if (!this.verifyHashComplete(payload)) {
      error = {
        name: 'payment',
        message: 'Access denied. Invalid signature',
        paymentCode: -1
      };
    }
    return error;
  }

  async preparePay(clickPayload: ClickPayload): Promise<ClickPayload> {
    console.log('payload: ', clickPayload);
    console.log('...preparePay');
    const verificationError = this.verifyRequest(clickPayload);
    if (verificationError) {
      return verificationError;
    }
    const headPayload = {
      click_trans_id: clickPayload.click_trans_id,
      merchant_trans_id: clickPayload.merchant_trans_id,
      merchant_prepare_id: clickPayload.merchant_prepare_id,
      error: clickPayload.error,
      error_note: clickPayload.error_note
    };

    console.log('trans: ', headPayload.click_trans_id);

    return clickPayload;
  }

  async completePay(clickPayload: ClickPayload) {
    console.log('...completePay', clickPayload);
    // const verificationError = this.verifyRequestComplete(clickPayload);
    // if (verificationError) {
    //   console.log('verification error');
    //   return verificationError;
    // }

    const headPayload = {
      service_id: clickPayload.service_id,
      click_trans_id: clickPayload.click_trans_id,
      merchant_confirm_id: clickPayload.merchant_confirm_id,
      merchant_trans_id: clickPayload.merchant_trans_id
    };

    // const newTransaction = await this.transactionRepository.create();
    // newTransaction.click_trans_id = headPayload.click_trans_id;
    // newTransaction.merchant_trans_id = headPayload.merchant_trans_id;
    // newTransaction.sign_time = clickPayload.sign_time;
    // newTransaction.sign_string = clickPayload.sign_string;
    // newTransaction.click_paydoc_id = clickPayload.click_paydoc_id;
    // newTransaction.amount = clickPayload.amount;

    return headPayload;
  }
}
