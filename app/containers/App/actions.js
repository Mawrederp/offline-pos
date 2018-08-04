import * as ActionTypes from './constants';

export function changeLayout(isBoxedLayout) {
  return {
    type: ActionTypes.CHANGE_LAYOUT,
    isBoxedLayout,
  };
}

export function openView(menuItem) {
  return {
    type: ActionTypes.OPEN_VIEW,
    menuItem,
  };
}

export function closeView(id) {
  return {
    type: ActionTypes.CLOSE_VIEW,
    id,
  };
}

export function selectMenuItem(id) {
  console.log(id);
  return {
    type: ActionTypes.SELECT_MENU_ITEM,
    id,
  };
}

export function loadMenuSuccess(data) {
  return {
    type: ActionTypes.LOAD_MENU_SUCCESS,
    data,
  };
}

export function loadMenu() {
  return {
    type: ActionTypes.LOAD_MENU,
  };
}

export function signIn(payload) {
  return {
    type: ActionTypes.SIGN_IN,
    payload,
  };
}

export function signInFacebook(payload) {
  return {
    type: ActionTypes.SIGN_IN_FACEBOOK,
    payload,
  };
}

export function signInGoogle(payload) {
  return {
    type: ActionTypes.SIGN_IN_GOOGLE,
    payload,
  };
}

export function clearAuthenticationMessage() {
  return {
    type: ActionTypes.CLEAR_AUTHENTICATION_MESSAGE,
  };
}

export function register(payload) {
  return {
    type: ActionTypes.REGISTER,
    payload,
  };
}

export function resetPassword(payload) {
  return {
    type: ActionTypes.RESET_PASSWORD,
    payload,
  };
}

export function signOut() {
  return {
    type: ActionTypes.SIGN_OUT,
  };
}
export function openBox(payload) {
  return {
    type: ActionTypes.OPEN_BOX,
    payload,
  };
}


export function openSettingsDrawer() {
  return {
    type: ActionTypes.OPEN_SETTING_DRAWER,
  };
}

export function closeSettingsDrawer() {
  return {
    type: ActionTypes.CLOSE_SETTING_DRAWER,
  };
}

export function changeTheme(theme) {
  return {
    type: ActionTypes.CHANGE_THEME,
    theme,
  };
}

export function changeShowTabs(value) {
  return {
    type: ActionTypes.CHANGE_SHOWS_TABS,
    value,
  };
}

export function changeShowOpenViews(value) {
  return {
    type: ActionTypes.CHANGE_SHOW_OPEN_VIEWS,
    value,
  };
}

export function animateMenus(menuId, willCloseMenu) {
  return {
    type: ActionTypes.ANIMATE_MENUS,
    menuId,
    willCloseMenu,
  };
}

export function toggleMenus(menuId) {
  return {
    type: ActionTypes.TOGGLE_MENUS,
    menuId,
  };
}

export function animateRootMenus(rootMenuName, willCloseRootMenu) {
  return {
    type: ActionTypes.ANIMATE_ROOT_MENUS,
    rootMenuName,
    willCloseRootMenu,
  };
}

export function toggleRootMenus(rootMenuName) {
  return {
    type: ActionTypes.TOGGLE_ROOT_MENUS,
    rootMenuName,
  };
}
