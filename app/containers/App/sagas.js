import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import mockMenuApi from '../../api/mockMenuApi';
import {
  SIGN_IN,
  SIGN_IN_FACEBOOK,
  SIGN_IN_GOOGLE,
  REGISTER,
  RESET_PASSWORD,
  RESET_PASSWORD_FAILED,
  AUTHENTICATED,
  AUTHENTICATION_FAILED,
  LOAD_MENU,
  LOAD_MENU_SUCCESS,
  LOAD_MENU_FAILED,
  REGISTRATION_FAILED,
} from './constants';

// worker Saga: will be fired on LOAD_MENU actions
export function* fetchMenu(action) {
  try {
    const data = yield call(mockMenuApi.getMenu, action);
    yield put({ type: LOAD_MENU_SUCCESS, data });
  } catch (e) {
    yield put({ type: LOAD_MENU_FAILED, message: e.message });
  }
}

/**
 * Watches for LOAD_MENU actions and calls fetchMenu when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */

export function* appSaga() {
  yield takeLatest(LOAD_MENU, fetchMenu);
}

export function* fetchSignIn(action) {
  try {
    // here you can call your API in order to authenticate the user
    if (action.payload.email === 'demo@test.com' &&
      action.payload.password === 'demo') {
      yield put({ type: AUTHENTICATED,
        user: {
          name: 'John Smith',
          email: action.payload.email,
          imgUrl: 'http://www.material-ui.com/images/ok-128.jpg',
        },
      });
    } else if (action.payload.email === 'demo2@test.com' &&
      action.payload.password === 'demo2') {
      yield put({ type: AUTHENTICATED,
        user: {
          name: 'Jane Doe',
          email: action.payload.email,
          imgUrl: 'http://www.material-ui.com/images/uxceo-128.jpg',
        },
      });
    } else {
      yield put({
        type: AUTHENTICATION_FAILED,
        message: 'Wrong user or password, please try again.',
      });
    }
  } catch (e) {
    yield put({ type: AUTHENTICATION_FAILED, message: e.message });
  }
}

export function* signIn() {
  yield takeLatest(SIGN_IN, fetchSignIn);
}

export function* fetchSignInFacebook(action) {
  try {
    // here you can call your API in order to authenticate the user, for this demo just authenticate an user
    yield put({ type: AUTHENTICATED,
      user: {
        name: 'John Smith',
        email: action.payload.email,
        imgUrl: 'http://www.material-ui.com/images/ok-128.jpg',
      },
    });
  } catch (e) {
    yield put({ type: AUTHENTICATION_FAILED, message: e.message });
  }
}

export function* signInFacebook() {
  yield takeLatest(SIGN_IN_FACEBOOK, fetchSignInFacebook);
}

export function* fetchSignInGoogle(action) {
  try {
    // here you can call your API in order to authenticate the user, for this demo just authenticate an user
    yield put({ type: AUTHENTICATED,
      user: {
        name: 'John Smith',
        email: action.payload.email,
        imgUrl: 'http://www.material-ui.com/images/ok-128.jpg',
      },
    });
  } catch (e) {
    yield put({ type: AUTHENTICATION_FAILED, message: e.message });
  }
}

export function* signInGoogle() {
  yield takeLatest(SIGN_IN_GOOGLE, fetchSignInGoogle);
}

export function* fetchRegister(action) {
  try {
    // here you can call your API in order to register an user, for this demo just authenticate an user
    yield put({ type: AUTHENTICATED,
      user: {
        name: 'John Smith',
        email: action.payload.email,
        imgUrl: 'http://www.material-ui.com/images/ok-128.jpg',
      },
    });
  } catch (e) {
    yield put({ type: REGISTRATION_FAILED, message: e.message });
  }
}

export function* register() {
  yield takeLatest(REGISTER, fetchRegister);
}

export function* fetchResetPassword(action) {
  try {
    // here you can call your API in order to reset the password, for this demo just authenticate an user
    yield put({ type: AUTHENTICATED,
      user: {
        name: 'John Smith',
        email: action.payload.email,
        imgUrl: 'http://www.material-ui.com/images/ok-128.jpg',
      },
    });
  } catch (e) {
    yield put({ type: RESET_PASSWORD_FAILED, message: e.message });
  }
}

export function* resetPassword() {
  yield takeLatest(RESET_PASSWORD, fetchResetPassword);
}

// All sagas to be loaded
export default [
  appSaga,
  signIn,
  signInFacebook,
  signInGoogle,
  register,
  resetPassword,
];
