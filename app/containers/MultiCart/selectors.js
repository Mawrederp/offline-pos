import { createSelector } from 'reselect';

/**
 * Direct selector to the multiCart state domain
 */
const selectMultiCartDomain = () => (state) => state.get('multiCart');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MultiCart
 */

const makeSelectMultiCart = () => createSelector(
  selectMultiCartDomain(),
  (substate) => substate.toJS()
);

export default makeSelectMultiCart;
export {
  selectMultiCartDomain,
};
