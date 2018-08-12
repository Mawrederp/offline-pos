import { createSelector } from 'reselect';

/**
 * Direct selector to the historyManager state domain
 */
const selectHistoryManagerDomain = () => (state) => state.get('historyManager');

/**
 * Other specific selectors
 */


/**
 * Default selector used by HistoryManager
 */

const makeSelectHistoryManager = () => createSelector(
  selectHistoryManagerDomain(),
  (substate) => substate.toJS()
);

export default makeSelectHistoryManager;
export {
  selectHistoryManagerDomain,
};
