import { all,put, takeLatest } from 'redux-saga/effects';

import {
  GET_PRODUCTS,
  PRODUCTS_LOADED,
  GET_PRODUCT,
  REMOVE_PRODUCT,
  SET_PRODUCT,
  PRODUCT_MODIFIED,
  PRODUCT_REMOVED,
} from './constants';
import ProductsApi from '../../api/ProductsApi';

const revKey = '_rev';
const idKey = '_id';

export function* fetchProducts(action) {
  try {
    const products = yield ProductsApi.getAllProducts();
    yield put({ type: PRODUCTS_LOADED, products });
  } catch (e) {
    console.log('in sagas', e);
  }
}

export function* getProductsSaga() {
  yield takeLatest(GET_PRODUCTS, fetchProducts);
}

export function* fetchProduct(action) {
  console.log('in sagas', action);
}

export function* getProductSaga() {
  yield takeLatest(GET_PRODUCT, fetchProduct);
}

export function* setProduct(action) {
  const variants = JSON.parse(action.product.variants);
  const variantsProps = JSON.parse(action.product.variantsProps);
  const product = { ...action.product, ...{ variants, variantsProps } };
  try {
    const resp = yield ProductsApi.setProduct(product);
    if (resp.ok) {
      yield put({
        type: PRODUCT_MODIFIED,
        product: { ...{ ...action.product, ...{ variants, variantsProps } }, ...{ [revKey]: resp.rev, [idKey]: resp.id } },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* setProductSaga() {
  yield takeLatest(SET_PRODUCT, setProduct);
}

export function* removeProduct(action) {
  try {
    const resp = yield ProductsApi.removeProduct(action.product);
    if (resp.ok) {
      yield put({ type: PRODUCT_REMOVED, product: action.product });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* removeProductSaga() {
  yield takeLatest(REMOVE_PRODUCT, removeProduct);
}

// All sagas to be loaded
export default [
  getProductsSaga,
  getProductSaga,
  setProductSaga,
  removeProductSaga,
];
