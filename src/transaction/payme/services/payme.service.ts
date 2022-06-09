/* eslint-disable @typescript-eslint/no-this-alias */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { TransactionEntity } from 'src/transaction/entities/transaction.entity';
import { Repository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { RPCErrors } from '../../../global/errors/rpcErrors';
import { OrderEntity } from 'src/order/entities/order.entity';
import { BilingErrors } from 'src/global/errors/billingErrors';

@Injectable()
export class PaymeService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    private configService: ConfigService,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>
  ) {}

  async payMe(req: Request, res: Response, next: NextFunction) {
    const base = this;
    const body = req.body;
    let TransactionsGUI = 1;

    if (req.method !== 'POST') {
      return sendResponse(RPCErrors.TransportError(), null);
    }

    if (!checkAuth(req.headers['authorization'])) {
      console.log('not auth');
      return sendResponse(RPCErrors.AccessDenied(), null);
    }

    if (body.method === 'CheckPerformTransaction') {
      CheckPerformTransaction(body.params);
    } else if (body.method === 'CreateTransaction') {
      CreateTransaction(body.params);
    } else if (body.method === 'PerformTransaction') {
      PerformTransaction(body.params);
    } else if (body.method === 'CheckTransaction') {
      CheckTransaction(body.params);
    } else if (body.method === 'CancelTransaction') {
      CancelTransaction(body.params);
    }

    async function CheckPerformTransaction(params: any) {
      const order = await base.orderRepository.findOne({
        where: {
          orderId: params.account.order_id
        }
      });
      if (!order) return sendResponse(RPCErrors.MethodNotFound(), null);

      if (order.state !== 0) {
        return sendResponse(BilingErrors.OrderAvailable(), null);
      }

      if (order.totalPrice * 100 !== params.amount) {
        return sendResponse(BilingErrors.IncorrectAmount(), null);
      }

      return this.sendResponse(null, {
        allow: true
      });
    }

    async function CreateTransaction(params: any) {
      const transaction = await base.transactionRepository.findOne({
        where: { payme_tid: params.id }
      });
      if (transaction) {
        if (transaction.state !== 1) {
          return sendResponse(BilingErrors.UnexpectedTransactionState(), null);
        }

        return sendResponse(null, {
          state: transaction.state,
          create_time: transaction.create_time,
          transaction: transaction.transaction.toString()
        });
      } else if (!transaction) {
        CheckPerformTransaction(params);

        const order = await base.orderRepository.findOne({
          where: {
            orderId: params.account.orderId
          }
        });
        if (!order) {
          return sendResponse(BilingErrors.OrderNotFound(), null);
        }

        const newTransaction = await base.transactionRepository.create();
        newTransaction.payme_tid = params.id;
        newTransaction.time = params.time;
        newTransaction.transaction = TransactionsGUI++;
        newTransaction.orderId = params.account.orderId;
        newTransaction.state = 1;
        newTransaction.create_time = Date.now();
        newTransaction.perform_time = 0;
        newTransaction.cancel_time = 0;
        newTransaction.reason = null;
        base.transactionRepository.save(newTransaction);

        await base.transactionRepository.save(newTransaction);
        await base.orderRepository.save({
          ...order,
          state: newTransaction.state
        });

        return sendResponse(null, {
          state: newTransaction.state,
          create_time: newTransaction.create_time,
          transaction: newTransaction.transaction.toString()
        });
      }
    }

    async function PerformTransaction(params: any) {
      const transaction = await base.transactionRepository.findOne({
        where: {
          payme_tid: params.id
        }
      });
      if (!transaction) {
        return sendResponse(BilingErrors.TransactionNotFound(), null);
      }

      const order = await base.orderRepository.findOne({
        where: { orderId: transaction.orderId }
      });

      if (transaction.state === 1) {
        order.state = 2;
        transaction.state = 2;
        transaction.perform_time = Date.now();
        await base.orderRepository.save({ ...order, state: order.state });
        await base.orderRepository.save({
          ...transaction,
          state: transaction.state,
          perform_time: transaction.perform_time
        });
      }
      if (transaction.state === 2) {
        return sendResponse(null, {
          state: transaction.state,
          perform_time: transaction.perform_time,
          transaction: transaction.transaction.toString()
        });
      }

      return sendResponse(BilingErrors.UnexpectedTransactionState(), null);
    }

    async function CancelTransaction(params: any) {
      const transaction = await base.transactionRepository.findOne({
        where: { payme_tid: params.id }
      });
      const order = await base.orderRepository.findOne({
        where: { orderId: transaction.orderId }
      });
      if (!transaction) {
        return sendResponse(BilingErrors.TransactionNotFound(), null);
      } else if (transaction.state === 1) {
        transaction.state = -1;
        transaction.reason = params.reason;
        transaction.cancel_time = Date.now();

        await base.transactionRepository.save({
          ...transaction,
          state: transaction.state,
          reason: transaction.reason,
          cancel_time: transaction.cancel_time
        });

        order.state = 0;

        await base.orderRepository.save({ ...order, state: order.state });

        return sendResponse(null, {
          state: transaction.state,
          cancel_time: transaction.cancel_time,
          transaction: transaction.transaction
        });
      } else if (transaction.state === 2) {
        if (order.state === 3) {
          return sendResponse(BilingErrors.OrderNotCanceled(), null);
        } else if (order.state === 2) {
          transaction.state = -2;
          transaction.reason = params.reason;
          transaction.cancel_time = Date.now();

          await base.transactionRepository.save({
            ...transaction,
            state: transaction.state,
            reason: transaction.reason,
            cancel_time: transaction.cancel_time
          });

          order.state = -2;

          await base.orderRepository.save({ ...order, state: order.state });
        }
      } else {
        return sendResponse(null, {
          state: transaction.state,
          cancel_time: transaction.cancel_time,
          transaction: transaction.transaction.toString()
        });
      }
    }

    async function CheckTransaction(params: any) {
      const transaction = await base.transactionRepository.findOne({
        where: { payme_tid: params.id }
      });
      if (!transaction) {
        return sendResponse(BilingErrors.TransactionNotFound(), null);
      }

      return sendResponse(null, {
        state: transaction.state,
        create_time: transaction.create_time,
        perform_time: transaction.perform_time,
        cancel_time: transaction.cancel_time,
        transaction: transaction.transaction.toString(),
        reason: transaction.reason
      });
    }

    function checkAuth(auth: any) {
      console.log('auth: ', auth);
      console.log('base', base.configService.get('payme_service'));
      console.log(base.configService.get('payme_service.merchant_id'));
      console.log('testkey', base.configService.get('payme_service.test_key'));
      return (
        auth &&
        (auth = auth.trim().split(/ +/)) &&
        auth[0] === 'Basic' &&
        auth[1] &&
        (auth = Buffer.from(auth[1], 'base64').toString('utf-8')) &&
        (auth = auth.trim().split(/ *: */)) &&
        auth[0] === 'Paycom' &&
        auth[1] === base.configService.get('payme_service.test_key')
      );
    }

    function sendResponse(error: any, result: any) {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
      });

      console.log('sendResponse error', error);
      console.log('sendResponse result', result);
      res.json({
        jsonrpc: '2.0',
        error: error || undefined,
        result: result || undefined,
        id: body.id
      });
    }
  }
}
