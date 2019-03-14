import { call, put, takeLatest, all } from 'redux-saga/effects';
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
  LOAD_AUTH_STATE,
  SIGN_OUT,
  CHANGE_LOCALE,
  ALTER_USER,
  SET_LOCALE,
} from './constants';
import AuthApi from '../../api/AuthApi';

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

export function* fetchAuthState() {
  try {
    const authState = yield AuthApi.getAuthState();
    const user = yield AuthApi.fetchUserById(authState.user);
    if (authState.value && user) {
      const effects = [
        put({
          type: AUTHENTICATED,
          user,
        }),
      ];

      if (user.locale) {
        effects.push(
          put({
            type: SET_LOCALE,
            locale: user.locale,
          })
        );
      }
      yield all(effects);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* authSaga() {
  yield takeLatest(LOAD_AUTH_STATE, fetchAuthState);
}

export function* fetchSignIn(action) {
  console.log(action);
  try {
    const user = yield AuthApi.attemptLogin(action.payload);
    console.log('login', user);
    if (!user) {
      yield put({
        type: AUTHENTICATION_FAILED,
        message: 'خطأ في كلمة المرور او اسم المستخدم',
      });
    } else {
      yield put({
        type: AUTHENTICATED,
        user,
      });
    }
  } catch (e) {
    yield put({ type: AUTHENTICATION_FAILED, message: e.message });
  }
}

export function* fetchSignOut() {
  AuthApi.signOutCleanUp();
}

export function* signOut() {
  yield takeLatest(SIGN_OUT, fetchSignOut);
}

export function* signIn() {
  yield takeLatest(SIGN_IN, fetchSignIn);
}

export function* fetchSignInFacebook(action) {
  try {
    // here you can call your API in order to authenticate the user, for this demo just authenticate an user
    yield put({
      type: AUTHENTICATED,
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
    yield put({
      type: AUTHENTICATED,
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
    const user = yield AuthApi.addUser(action.payload);
    if (!user.error) {
      yield put({
        type: AUTHENTICATED,
        user: {
          ...user,
          imgUrl: 'http://www.material-ui.com/images/ok-128.jpg',
        },
      });
    }
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
    yield put({
      type: AUTHENTICATED,
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

export function* setLocalSaga(action) {
  // payload is immutable
  const { user, locale } = action.locale.toJS();
  const response = yield AuthApi.setUserLocale(user, locale);

  yield put({
    type: ALTER_USER,
    user: { ...user, locale, ...{ _rev: response.rev } },
  });
}

export function* changeLocal() {
  yield takeLatest(CHANGE_LOCALE, setLocalSaga);
}

// All sagas to be loaded
export default [
  appSaga,
  signIn,
  signInFacebook,
  signInGoogle,
  register,
  resetPassword,
  fetchAuthState,
  signOut,
  changeLocal,
];
