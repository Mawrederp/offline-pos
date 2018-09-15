/*
 *
 * Checkout reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
  ADD_CART,
  ADD_TO_CART,
  SET_ACTIVE_CART,
  REMOVE_FROM_CART,
  SET_TRANSACTION,
  REGISTRY_MODIFIED,
} from './constants';
import {PRODUCT_MODIFIED, PRODUCT_REMOVED, PRODUCTS_LOADED} from '../ProductsManagement/constants';
import ProductUtils from './ProductUtils';
const initialState = fromJS({
  products: {},
  loaded: false,
  carts: { 0: {
    products: [],
    customer: null,
    subTotal: 0,
    total: 0,
    tax: 0,
    discount: 0,
  },
  },
  activeCart: '0',
});
const idKey = '_id';
function checkoutReducer(state = initialState, action) {
  let temp = null;
  const activeCart = state.get('activeCart');
  switch (action.type) {
    case ADD_CART:
      return state.mergeIn(['carts'], { [state.get('carts').size]: { products: [], customer: null } });
    case ADD_TO_CART:
      temp = state.setIn(['carts', activeCart, 'products'], ProductUtils.populateProducts(action.payload, state.get('carts').get(activeCart)));
      temp = state.setIn(['carts', activeCart], ProductUtils.evaluate(temp.getIn(['carts', activeCart])));
      return temp;
    case REMOVE_FROM_CART:
      temp = state.setIn(['carts', activeCart, 'products'], state.get('carts').get(activeCart).get('products')
        .filterNot((product) => ((product.product.name === action.payload.product.name) && (product.variantPropId === action.payload.variantPropId))));
      temp = state.setIn(['carts', activeCart], ProductUtils.evaluate(temp.getIn(['carts', activeCart])));
      return temp;
    case SET_ACTIVE_CART:
      return state.set('activeCart', action.cartId);
    case PRODUCTS_LOADED:
      console.log(state.toJS(), action);
      return state.set('loaded', true).set('products', Map(action.products));
    case PRODUCT_MODIFIED:
      return state.mergeDeep(state, { products: { [action.product[idKey]]: action.product } });
    case PRODUCT_REMOVED:
      return state.deleteIn(['products', action.product[idKey]]);
    default:
      return state;
  }
}

export default checkoutReducer;
