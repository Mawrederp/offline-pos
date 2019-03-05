import { put, takeLatest } from 'redux-saga/effects';
import {
  GET_REGISTRY_STATE,
  SET_POS_STATE,
  REGISTRY_STATE_MODIFIED,
  GET_REGISTRY_LOADED,
} from '../App/constants';
import PosApi from '../../api/PosApi';
import TransactionsApi from '../../api/TransactionsApi';

import { TRANSACTION_CONCLUDED } from '../Checkout/constants';

// Individual exports for testing

export function* setPosStateSaga(action) {
  try {
    const resp = yield PosApi.manageRegistry(action.payload);
    yield put({
      type: REGISTRY_STATE_MODIFIED,
      payload: { ...action.payload, ...{ _rev: resp.rev } },
    });
    console.log(resp);
  } catch (e) {
    console.log(e);
  }
}

export function* setRegistryState() {
  console.log('in sagass');
  yield takeLatest(SET_POS_STATE, setPosStateSaga);
}
export function* transactionConclusionSaga(action) {
  console.log(action, 'a payment was put in my box and i wanna indicate it ');
  try {
    const newState = yield TransactionsApi.getBoxBrief();
    const resp = yield PosApi.manageRegistry(newState);
    yield put({
      type: REGISTRY_STATE_MODIFIED,
      payload: { ...newState, ...{ _rev: resp.rev } },
    });
  } catch (e) {
    console.log(e);
  }
}

export function* transactionConcluded() {
  console.log('REGISTRY SAGAS KNOWS . . . ');
  yield takeLatest(TRANSACTION_CONCLUDED, transactionConclusionSaga);
}
export function* fetchPosStateSaga() {
  const registryState = yield PosApi.getTellerState();
  yield put({ type: GET_REGISTRY_LOADED, payload: registryState });
}

export function* getRegistryState() {
  yield takeLatest(GET_REGISTRY_STATE, fetchPosStateSaga);
}

// All sagas to be loaded
export default [setRegistryState, getRegistryState, transactionConcluded];
