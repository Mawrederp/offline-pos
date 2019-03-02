import { put, takeLatest } from 'redux-saga/effects';
import { SET_TRANSACTION } from './constants';
import TransactionsApi from '../../api/TransactionsApi';
export function* setTransactionSaga(action) {
  console.log('what i got in sagas is ', action, 'and this is from checkout');
  try {
    console.log(put(TransactionsApi.setTransaction(action.cart)));
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
