export const BilingErrors = {
  TransactionNotFound: function () {
    return {
      code: -31003,
      message: 'Транзакция не найденна',
      data: null
    };
  },

  UnexpectedTransactionState: function () {
    return {
      code: -31008,
      message: 'Статус транзакции не позволяет выполнить операцию',
      data: null
    };
  },

  IncorrectAmount: function () {
    return {
      code: -31001,
      message: 'Неверная сумма заказа',
      data: null
    };
  },

  OrderNotFound: function () {
    return {
      code: -31050,
      message: 'Заказ не найден',
      data: 'order'
    };
  },

  OrderAvailable: function () {
    return {
      code: -31051,
      message:
        'He возможно выполнить операцию. Заказ ожидает оплаты или оплачен.',
      data: 'order'
    };
  },

  OrderNotCanceled: function () {
    return {
      code: -31007,
      message: 'Заказ полность выполнен и не подлежит отмене.',
      data: null
    };
  }
};
