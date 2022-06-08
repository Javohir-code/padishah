import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { Repository } from 'typeorm';
import * as md5 from 'md5';
import { ClickPayload } from '../interfaces/click-payload.interface';
import { errorHandler } from '../../../global/errors/errorController';
import { OrderEntity } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/services/order.service';

// class AppError extends Error {
//   name: any;
//   message: any;
//   content: any;
//   paymentCode: any;
//   statusCode: any;
//   status: string;
//   constructor({ name, message, code, paymentCode, content }) {
//     super();
//     this.name = name || 'client';
//     this.message = message;
//     this.paymentCode = paymentCode;
//     this.content = content;
//     this.statusCode = name === 'payment' ? 200 : code || 500;
//     this.status = this.statusCode.toString().startsWith(4) ? 'fail' : 'error';

//     let errorPayload;
//     // eslint-disable-next-line @typescript-eslint/no-this-alias
//     const er = this;
//     if (er.name === 'payment') {
//       errorPayload = {
//         ...(er.content || {}),
//         error: er.paymentCode,
//         error_note: errorHandler[er.paymentCode]
//       };
//     } else if (er.name === 'client') {
//       errorPayload = {
//         status: er.status,
//         message: er.message || 'Something went wrong, please try again'
//       };
//     }
//     console.log('errorPayload', errorPayload);
//     return errorPayload;
//   }
// }

@Injectable()
export class ClickService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    private configService: ConfigService,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private orderService: OrderService
  ) {}

  verifyHash(clickPayload) {
    // console.log('clickPayload', clickPayload);
    // console.log('click_trans_id', clickPayload.click_trans_id);
    // console.log('service_id', clickPayload.service_id);
    // console.log(
    //   'click_service_id',
    //   this.configService.get('click_service.secret_key')
    // );
    // console.log('merchant_trans_id', clickPayload.merchant_trans_id);
    // console.log('amount', clickPayload.amount);
    // console.log('action', clickPayload.action);
    // console.log('sign_time', clickPayload.sign_time);
    const hash = md5(
      clickPayload.click_trans_id +
        clickPayload.service_id +
        this.configService.get('click_service.secret_key') +
        clickPayload.merchant_trans_id +
        clickPayload.amount +
        clickPayload.action +
        clickPayload.sign_time
    );
    return hash === clickPayload.sign_string;
  }

  verifyHashComplete(clickPayload) {
    // console.log('clickPayload', clickPayload);
    // console.log('click_trans_id', clickPayload.click_trans_id);
    // console.log('service_id', clickPayload.service_id);
    // console.log(
    //   'CLICK_SECRET_KEY',
    //   this.configService.get('click_service.secret_key')
    // );
    // console.log('merchant_trans_id', clickPayload.merchant_trans_id);
    // console.log('merchant_prepare_id', clickPayload.merchant_prepare_id);
    // console.log('amount', clickPayload.amount);
    // console.log('action', clickPayload.action);
    // console.log('sign_time', clickPayload.sign_time);
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
    return hash === clickPayload.sign_string;
  }

  async verifyRequest(payload) {
    const order = await this.orderService.getOrderPrepare(
      payload.merchant_trans_id
    );
    console.log('order', order);
    let error;
    if (!this.verifyHash(payload)) {
      error = {
        error: -1,
        error_note: errorHandler['-1']
      };
    } else if (payload.action !== '0' && payload.action !== '1') {
      error = {
        error: '-3',
        error_note: errorHandler['-3']
      };
    } else if (!order) {
      error = {
        error: '-5',
        error_note: errorHandler['-5']
      };
    } else if (order.totalPrice != payload.amount) {
      error = {
        error: '-2',
        error_note: errorHandler['-2']
      };
    } else if (order.paid == 1) {
      error = {
        error: '-4',
        error_note: errorHandler['-4']
      };
    } else {
      error = {
        error: '0',
        error_note: errorHandler[0]
      };
    }
    console.log(error);
    return error;
  }

  async verifyRequestComplete(payload) {
    console.log('...verifyRequestComplete');
    const order = await this.orderService.getOrderComplete(
      payload.click_trans_id,
      payload.merchant_trans_id
    );
    let error;
    if (!this.verifyHashComplete(payload)) {
      error = {
        error: '-1',
        error_note: errorHandler['-1']
      };
    } else if (payload.action !== '0' && payload.action !== '1') {
      error = {
        error: '-3',
        error_note: errorHandler['-3']
      };
    } else if (!order) {
      error = {
        error: '-6',
        error_note: errorHandler['-6']
      };
    } else if (payload.error === -5017) {
      (order.refunded = 1), (order.cancelled = 1);
      await this.orderRepository.save({ ...order, order });
      error = {
        error: '-9',
        error_note: errorHandler['-9']
      };
    } else if (payload.error == -1 && order.paid == 1) {
      error = {
        error: '-4',
        error_note: errorHandler['-4']
      };
    } else if (order.cancelled == 1) {
      order.cancelled = 0;
      await this.orderRepository.save({ ...order, order });
      error = {
        error: '-9',
        error_note: errorHandler['-9']
      };
    } else if (order.paid == 1) {
      error = {
        error: '-4',
        error_note: errorHandler['-4']
      };
    } else {
      error = {
        error: '0',
        error_note: errorHandler[0]
      };
    }

    console.log(error);
    return error;
  }

  async preparePay(clickPayload) {
    console.log('click', clickPayload);
    const verificationError = await this.verifyRequest(clickPayload);
    // console.log(verificationError);
    // if (verificationError) {
    //   return verificationError;
    // }
    const headPayload = {
      click_trans_id: clickPayload.click_trans_id,
      merchant_trans_id: clickPayload.merchant_trans_id,
      merchant_prepare_id: clickPayload.merchant_trans_id,
      merchant_confirm_id: clickPayload.merchant_trans_id,
      error: verificationError.error,
      error_note: verificationError.error_note
    };
    console.log(headPayload);
    return headPayload;
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
