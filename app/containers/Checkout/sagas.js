import { put, takeLatest } from 'redux-saga/effects';
import { SET_TRANSACTION, TRANSACTION_CONCLUDED } from './constants';
import { GET_ALL_TRANASCTIONS } from '../HistoryManager/constants';

import TransactionsApi from '../../api/TransactionsApi';

export function* setTransactionSaga({ cart }) {
  try {
    const resp = yield TransactionsApi.setTransaction(cart);
    if (resp.ok) {
      yield put({ type: TRANSACTION_CONCLUDED, id: resp.id });
      yield put({ type: GET_ALL_TRANASCTIONS, id: resp.id });
    }
  } catch (e) {
    console.log('in sagas', e);
  }
}
export function* setTransaction() {
  yield takeLatest(SET_TRANSACTION, setTransactionSaga);
}
//
// All sagas to be loaded
export default [setTransaction];
