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
  TRANSACTION_CONCLUDED,
  RESET_ACTIVE_CART,
} from './constants';
import {
  PRODUCT_MODIFIED,
  PRODUCT_REMOVED,
  PRODUCTS_LOADED,
} from '../ProductsManagement/constants';
import ProductUtils from './ProductUtils';
const initialState = fromJS({
  products: {},
  loaded: false,
  carts: {
    0: {
      products: [],
      customer: null,
      subTotal: 0,
      total: 0,
      tax: 0,
      discount: 0,
      id: null,
    },
  },
  activeCart: '0',
});
const idKey = '_id';
function checkoutReducer(state = initialState, action) {
  console.log(state, action, 'checkout reducer things');
  let temp = null;
  const activeCart = state.get('activeCart');
  switch (action.type) {
    case ADD_CART:
      return state.mergeIn(['carts'], {
        [state.get('carts').size]: { products: [], customer: null },
      });
    case ADD_TO_CART:
      temp = state.setIn(
        ['carts', activeCart, 'products'],
        ProductUtils.populateProducts(
          action.payload,
          state.get('carts').get(activeCart)
        )
      );
      temp = state.setIn(
        ['carts', activeCart],
        ProductUtils.evaluate(temp.getIn(['carts', activeCart]))
      );
      return temp;
    case REMOVE_FROM_CART:
      temp = state.setIn(
        ['carts', activeCart, 'products'],
        state
          .get('carts')
          .get(activeCart)
          .get('products')
          .filterNot(
            (product) =>
              product.product.name === action.payload.product.name &&
              product.variantPropId === action.payload.variantPropId
          )
      );
      temp = state.setIn(
        ['carts', activeCart],
        ProductUtils.evaluate(temp.getIn(['carts', activeCart]))
      );
      return temp;
    case SET_ACTIVE_CART:
      return state.set('activeCart', action.cartId);
    case RESET_ACTIVE_CART:
      return state.setIn(
        ['carts', state.get('activeCart')],
        fromJS({
          products: [],
          customer: null,
          subTotal: 0,
          total: 0,
          tax: 0,
          discount: 0,
        })
      );
    case PRODUCTS_LOADED:
      return state.set('loaded', true).set('products', Map(action.products));
    case PRODUCT_MODIFIED:
      return state.mergeDeep(state, {
        products: { [action.product[idKey]]: action.product },
      });
    case PRODUCT_REMOVED:
      return state.deleteIn(['products', action.product[idKey]]);
    case TRANSACTION_CONCLUDED:
      return state.setIn(['carts', activeCart, 'id'], action.id);
    default:
      return state;
  }
}

export default checkoutReducer;
