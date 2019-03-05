import PouchApi from './PouchApi';
import { storage } from '../storage';
// import { TELLER_ID } from '../config/teller';

const transactionsDB = storage.transactions.db;
const idKey = '_id';
// const revKey = '_rev';

class TransactionsApi extends PouchApi {
  static async getAllTransactions() {
    try {
      const docs = await transactionsDB.allDocs({
        include_docs: true,
      });
      return docs.rows
        .map((transaction) => transaction.doc)
        .reduce(
          (acc, transaction) => ({
            ...acc,
            [transaction[idKey]]: transaction,
          }),
          {}
        );
    } catch (error) {
      if (error.name === 'not_found') {
        return [];
      }
      throw error;
    }
  }
  static async getBoxBrief() {
    const transactions = await TransactionsApi.getAllTransactions();
    const overallTellerWorth = Object.keys(transactions).reduce(
      (acc, transactionKey) => {
        const boxWorth = acc;
        const transaction = transactions[transactionKey];
        const transactionValue = transaction.payments.reduce(
          (transactionVal, payment) => {
            const transactionOutput = transactionVal;
            if (payment.type === 'card') {
              transactionOutput.receipts += payment.value;
            } else transactionOutput.cash = transactionVal.cash + payment.value;
            return transactionOutput;
          },
          {
            receipts: 0,
            cash: 0,
          }
        );
        boxWorth.receipts += transactionValue.receipts;
        boxWorth.cash += transactionValue.cash;
        return boxWorth;
      },
      {
        receipts: 0,
        cash: 0,
      }
    );
    return overallTellerWorth;
  }
  static async setTransaction({ cart, endResult, payments, user }) {
    const transaction = {
      [idKey]: `TRANSACTION_${Date.now()}`,
      createdAt: Date.now(),
      user: user[idKey],
      payments,
      endResult,
      cart,
    };
    try {
      const resp = await transactionsDB.put(transaction);
      return resp;
    } catch (error) {
      if (error.name === 'conflict') {
        const exp = {
          message: ' موجود مسبقا',
          name: 'PRODUCT_EXISTS_CONFLICT',
        };
        throw exp;
      }

      return null;
    }
  }
}

export default TransactionsApi;
