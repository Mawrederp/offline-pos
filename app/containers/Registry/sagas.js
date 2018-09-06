import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_REGISTRY_STATE, SET_POS_STATE, REGISTRY_STATE_MODIFIED, GET_REGISTRY_LOADED } from '../App/constants';
import PosApi from '../../api/PosApi';

// Individual exports for testing

export function* setPosStateSaga(action) {
  try {
    const resp = yield PosApi.manageRegistry(action.payload);
    yield put({ type: REGISTRY_STATE_MODIFIED, payload: { ...action.payload, ...{ _rev: resp.rev } } });
    console.log(resp);
  } catch (e) {
    console.log(e);
  }
}

export function* setRegistryState() {
  console.log('in sagass');
  yield takeLatest(SET_POS_STATE, setPosStateSaga);
}

export function* fetchPosStateSaga() {
  const registryState = yield PosApi.getTellerState();
  yield put({ type: GET_REGISTRY_LOADED, payload: registryState });
}

export function* getRegistryState() {
  yield takeLatest(GET_REGISTRY_STATE, fetchPosStateSaga);
}

// All sagas to be loaded
export default [
  setRegistryState,
  getRegistryState,
];
