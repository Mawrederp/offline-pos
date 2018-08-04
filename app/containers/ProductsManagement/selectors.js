import { createSelector } from 'reselect';

/**
 * Direct selector to the productsManagement state domain
 */
const selectProductsManagementDomain = () => (state) => state.get('productsManagement');

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

export default makeSelectProductsManagement;
export {
  selectProductsManagementDomain,
};
