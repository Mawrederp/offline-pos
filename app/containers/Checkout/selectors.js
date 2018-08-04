import { createSelector } from 'reselect';

/**
 * Direct selector to the checkout state domain
 */
const selectCheckoutDomain = () => (state) => state.get('checkout');

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

export default makeSelectCheckout;
export {
  selectCheckoutDomain,
};
