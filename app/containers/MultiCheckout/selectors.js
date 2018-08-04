import { createSelector } from 'reselect';

/**
 * Direct selector to the multiCheckout state domain
 */
const selectMultiCheckoutDomain = () => (state) => state.get('multiCheckout');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MultiCheckout
 */

const makeSelectMultiCheckout = () => createSelector(
  selectMultiCheckoutDomain(),
  (substate) => substate.toJS()
);

export default makeSelectMultiCheckout;
export {
  selectMultiCheckoutDomain,
};
