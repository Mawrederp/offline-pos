/*
 *
 * ProductsManagement actions
 *
 */

import {
  GET_PRODUCT,
  GET_PRODUCTS,
  REMOVE_PRODUCT,
  SET_PRODUCT,
} from './constants';

export function getProducts() {
  return {
    type: GET_PRODUCTS,
  };
}

export function getProduct(id) {
  return {
    type: GET_PRODUCT,
    id,
  };
}

export function setProduct(product) {
  return {
    type: SET_PRODUCT,
    product,
  };
}
export function removeProduct(product) {
  return {
    type: REMOVE_PRODUCT,
    product,
  };
}
