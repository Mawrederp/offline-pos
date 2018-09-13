/*
 *
 * ProductsManagement reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
  PRODUCTS_LOADED,
  PRODUCT_LOADED,
  PRODUCT_MODIFIED,
  PRODUCT_REMOVED,
  PRODUCTS_ADDED,
} from './constants';

const initialState = fromJS({ loaded: false, products: {} });
const idKey = '_id';
function productsManagementReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_LOADED:
      return state.set('loaded', true).set('products', Map(action.products));
    case PRODUCT_LOADED:
      return state;
    case PRODUCTS_ADDED:
      return state;
    case PRODUCT_MODIFIED:
      return state.mergeDeep(state, { products: { [action.product[idKey]]: action.product } });
    case PRODUCT_REMOVED:
      return state.deleteIn(['products', action.product[idKey]]);
    default:
      return state;
  }
}

export default productsManagementReducer;
