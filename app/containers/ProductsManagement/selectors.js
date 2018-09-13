import { createSelector } from 'reselect';

/**
 * Direct selector to the productsManagement state domain
 */
const selectProductsManagementDomain = () => (state) => state.get('productsStore');
const selectUserDomain = () => (state) => state.get('global').get('user');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProductsManagement
 */

const makeSelectProductsManagement = () => createSelector(
  selectProductsManagementDomain(),
  (substate) => substate.toJS()
);

export const makeSelectUser = () => createSelector(
  selectUserDomain(),
  (substate) => substate
);

export default makeSelectProductsManagement;
export {
  selectProductsManagementDomain,
};
