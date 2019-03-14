/*
 *
 * HistoryManager actions
 *
 */

import { GET_ALL_TRANASCTIONS } from './constants';

export function getAllTransactions() {
  return {
    type: GET_ALL_TRANASCTIONS,
  };
}
