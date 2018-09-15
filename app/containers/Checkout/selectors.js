import { createSelector } from 'reselect';

/**
 * Direct selector to the checkout state domain
 */
const selectCheckoutDomain = () => (state) => state.get('checkout');
const selectGlobalDomain = () => (state) => state.get('global');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Checkout
 */

const makeSelectCheckout = () => createSelector(
  selectCheckoutDomain(),
  (substate) => substate.toJS()
);
export const makeSelectGlobal = () => createSelector(
  selectGlobalDomain(),
  (substate) => substate.toJS()
);
export default makeSelectCheckout;
export {
  selectCheckoutDomain,
};
