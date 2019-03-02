import PouchApi from './PouchApi';
import { storage } from '../storage';
import { TELLER_ID } from '../config/teller';

const transactionsDB = storage.transactions.db;
const idKey = '_id';
// const revKey = '_rev';

class TransactionsApi extends PouchApi {
  static async getAllTransactions() {
    try {
      const docs = await transactionsDB.allDocs({
        include_docs: true,
        binary: true,
        attachments: true,
      });
      return docs.rows
        .map(transaction => transaction.doc)
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
  static async setTransaction({ cart, endResult, payments, user }) {
    console.log('in transaction and this is what i got ', {
      user,
      payments,
      endResult,
      cart,
    });
    const transaction = {
      [idKey]: `TRANSACTION_${Date.now()}`,
      createdAt: Date.now(),
      user: user[idKey],
      payments,
      endResult,
      cart,
    };
    console.log(transaction);
    try {
      const resp = await transactionsDB.put(transaction);
      console.log(resp);
      return resp;
    } catch (error) {
      if (error.name === 'conflict') {
        const exp = {
          message: ' موجود مسبقا',
          name: 'PRODUCT_EXISTS_CONFLICT',
        };
        throw exp;
      }
      console.log(error, transaction);

      return null;
    }
  }
}

export default TransactionsApi;
