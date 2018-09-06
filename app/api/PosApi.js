import PouchApi from './PouchApi';
import { storage } from '../storage';
import { TELLER_ID } from '../config/teller';

const posDB = storage.tellers.db;
const idKey = '_id';
const revKey = '_rev';
const tellerId = `TELLER_${TELLER_ID}`;

class PosApi extends PouchApi {
  static async getTellerState() {
    try {
      return await posDB.get(tellerId);
    } catch (error) {
      if (error.name === 'not_found') {
        return {
          _id: tellerId,
          open: false,
        };
      }
      return error;
    }
  }

  static async manageRegistry({ user, receipts, cash, time, open }) {
    const tellerState = await this.getTellerState();
    console.log(tellerState);
    try {
      return await posDB.put({
        ...tellerState,
        ...{
          open,
          user,
          receipts,
          cash,
          time,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default PosApi;
