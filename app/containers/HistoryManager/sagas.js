import { put, takeLatest } from 'redux-saga/effects';
import { GET_ALL_TRANASCTIONS, TRANASCTIONS_LOADED } from './constants';

// Individual exports for testing
import TransactionsApi from '../../api/TransactionsApi';

export function* getAllTransactionsSaga() {
  try {
    const resp = yield TransactionsApi.getAllTransactions();
    yield put({ type: TRANASCTIONS_LOADED, transactions: resp });
  } catch (e) {
    console.log('in sagas', e);
  }
}
export function* getAllTransactions() {
  yield takeLatest(GET_ALL_TRANASCTIONS, getAllTransactionsSaga);
}

// All sagas to be loaded
export default [getAllTransactions];
