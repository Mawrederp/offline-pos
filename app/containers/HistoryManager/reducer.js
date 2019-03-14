/*
 *
 * HistoryManager reducer
 *
 */

import { fromJS, Map } from 'immutable';
import { TRANASCTIONS_LOADED } from './constants';
import * as transactionsUtils from './transactionsUtils';
const initialState = fromJS({
  transactions: Map({}),
  transactionTimeIndex: {},
  loaded: false,
});

function historyManagerReducer(state = initialState, action) {
  console.log('in history reducer', state, action);
  switch (action.type) {
    case TRANASCTIONS_LOADED:
      return state
        .mergeIn(['transactions'], action.transactions)
        .mergeDeepIn(
          ['transactionTimeIndex'],
          fromJS(transactionsUtils.getTransactionsTimeIndex(action.transactions))
        )
        .set('loaded', true);
    default:
      return state;
  }
}

export default historyManagerReducer;
