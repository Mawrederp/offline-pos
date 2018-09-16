/*
 *
 * Checkout actions
 *
 */

import { getProducts } from '../ProductsManagement/actions';
import {
  ADD_CART,
  ADD_TO_CART,
  SET_ACTIVE_CART,
  SET_TRANSACTION,
  REMOVE_FROM_CART,
  RESET_ACTIVE_CART,
} from './constants';

export const getCheckoutProducts = getProducts;
// reducers only
export function addCart() {
  return {
    type: ADD_CART,
  };
}

export function addToCart(payload) {
  // product , cart , variant prop if exists
  return {
    type: ADD_TO_CART,
    payload,
  };
}

export function removeFromCart(payload) {
  // product , cart , variant prop if exists
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
}

export function setActiveCart(cartId) {
  return {
    type: SET_ACTIVE_CART,
    cartId,
  };
}

export function resetActiveCart() {
  return {
    type: RESET_ACTIVE_CART,
  };
}

// sagas only
export function setTransaction(cart) {
  return {
    type: SET_TRANSACTION,
    cart,
  };
}
