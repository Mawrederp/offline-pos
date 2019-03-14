import { fromJS } from 'immutable';
import * as ActionTypes from './constants';
import { localesDir } from '../../config/localization';
import { CHANGE_LOCALE } from '../LanguageProvider/constants';
const initialState = fromJS({
  user: {
    name: 'اكرم عبد الرحمن',
    email: 'demo@test.com',
    imgUrl: 'http://www.material-ui.com/images/ok-128.jpg',
  },
  box: { open: false },
  authenticationErrorMessage: '',
  registrationErrorMessage: '',
  menus: [],
  openViews: [],
  selectedMenuIndex: 0,
  selectedMenuItem: null,
  selectedOpenedMenuIndex: 0,
  selectedOpenedMenuItem: null,
  userIsAuthenticated: false,
  currentTheme: 'grayTheme', // darkTheme, lightTheme, blueTheme, grayTheme, darkBlueTheme
  isRtl: true,
  openSettingDrawer: false,
  showTabs: true,
  showOpenViews: true,
  isBoxedLayout: false,
});

function setBodyBackground(currentTheme) {
  const body = document.querySelector('body');

  switch (currentTheme) {
    case 'darkTheme':
      body.style.backgroundColor = '#37474f';
      break;
    case 'lightTheme':
      body.style.backgroundColor = '#eee';
      break;
    case 'blueTheme':
      body.style.backgroundColor = '#3e6e99';
      break;
    case 'grayTheme':
      body.style.backgroundColor = '#575f6a';
      break;
    case 'darkBlueTheme':
      body.style.backgroundColor = '#303a47';
      break;
    default:
      body.style.backgroundColor = '#f5f5f5';
      break;
  }
}

function appReducer(state = initialState, action) {
  console.log(action);
  const revKey = '_rev';
  switch (action.type) {
    case ActionTypes.CHANGE_LAYOUT: {
      const currentTheme = state.get('currentTheme');
      setBodyBackground(currentTheme);

      return state.set('isBoxedLayout', action.isBoxedLayout);
    }
    case ActionTypes.CHANGE_THEME: {
      setBodyBackground(action.theme);

      return state.set('currentTheme', action.theme);
    }
    case ActionTypes.CHANGE_SHOWS_TABS:
      return state.set('showTabs', action.value);
    case ActionTypes.CHANGE_SHOW_OPEN_VIEWS:
      return state.set('showOpenViews', action.value);
    case ActionTypes.CHANGE_LOCALE:
      return state.set('isRtl', localesDir[action.locale]);
    case ActionTypes.SET_LOCALE:
      return state.set('isRtl', localesDir[action.locale]);

    // Authentication process
    case ActionTypes.AUTHENTICATED: {
      const menus = state.get('menus');
      const openViews = state.get('openViews');
      const menuItem = menus[0];
      const openedMenuItem = openViews[0];

      return state
        .set('userIsAuthenticated', true)
        .set('user', action.user)
        .set('authenticationErrorMessage', '')
        .set('selectedMenuIndex', 0)
        .set('selectedMenuItem', menuItem)
        .set('selectedOpenedMenuIndex', 0)
        .set('selectedOpenedMenuItem', openedMenuItem);
    }
    case ActionTypes.ALTER_USER:
      return state.set('isRtl', localesDir[action.user.locale]).set('user', {
        ...state.get('user'),
        ...{ _rev: action.user[revKey] },
      });
    case ActionTypes.GET_REGISTRY_LOADED:
      return state.set('box', action.payload);
    case ActionTypes.REGISTRY_STATE_MODIFIED:
      return state.set('box', { ...state.get('box'), ...action.payload });
    case ActionTypes.AUTHENTICATION_FAILED: {
      return state.set('authenticationErrorMessage', action.message);
    }
    case ActionTypes.CLEAR_AUTHENTICATION_MESSAGE: {
      return state.set('authenticationErrorMessage', '');
    }
    case ActionTypes.REGISTRATION_FAILED: {
      return state.set('registrationErrorMessage', action.message);
    }
    case ActionTypes.SIGN_OUT:
      return state
        .set('userIsAuthenticated', false)
        .set('user', {})
        .set('authenticationErrorMessage', '');
    // End of Authentication process
    case ActionTypes.OPEN_BOX:
      return state.set('box', { open: true });
    case ActionTypes.LOAD_MENU_SUCCESS: {
      const data = action.data;

      return state
        .set('menus', data.menus)
        .set('openViews', data.openViews)
        .set('selectedMenuItem', data.selectedMenuItem)
        .set('selectedOpenedMenuItem', data.selectedOpenedMenuItem);
    }
    case ActionTypes.OPEN_VIEW: {
      const openViews = state.get('openViews');

      if (openViews.indexOf(action.menuItem) === -1) {
        openViews.push(action.menuItem);
        return state.set('openViews', openViews);
      }
      return state;
    }
    case ActionTypes.CLOSE_VIEW: {
      const menus = state.get('menus');
      const openViews = Object.assign([], state.get('openViews'));

      let itemFound = openViews.find((item) => item.id === action.id);

      const indexToBeRemoved = openViews.indexOf(itemFound);
      let openedIndex = 0;

      if (indexToBeRemoved > 0) {
        openedIndex = indexToBeRemoved - 1;
      }

      const itemOpenedFound = openViews[openedIndex];
      let menuIndex;

      menus.forEach((menu) => {
        if (itemOpenedFound.id === menu.id) {
          itemFound = menu;
          menuIndex = menu.index;
        }
        if (menu.children) {
          menu.children.forEach((child) => {
            if (itemOpenedFound.id === child.id) {
              itemFound = child;
              menuIndex = child.index;
            }
          });
        }
      });

      openViews.splice(indexToBeRemoved, 1);

      return state
        .set('openViews', openViews)
        .set('selectedMenuIndex', menuIndex)
        .set('selectedMenuItem', itemFound)
        .set('selectedOpenedMenuIndex', openedIndex)
        .set('selectedOpenedMenuItem', itemOpenedFound);
    }
    case ActionTypes.SELECT_MENU_ITEM: {
      const menus = state.get('menus');
      const openViews = state.get('openViews');

      let itemFound;
      let index;

      menus.forEach((menu) => {
        if (action.id === menu.id) {
          itemFound = menu;
          index = menu.index;
        }
        if (menu.children) {
          menu.children.forEach((child) => {
            if (action.id === child.id) {
              itemFound = child;
              itemFound.icon = menu.icon;
              index = child.index;
            }
          });
        }
      });

      let itemOpenedFound = openViews.find((item) => item.id === itemFound.id);

      let openedIndex = 0;

      if (!itemOpenedFound) {
        itemOpenedFound = Object.assign({}, itemFound);
        openedIndex = openViews.length;
      } else {
        openedIndex = openViews.indexOf(itemOpenedFound);
      }

      return state
        .set('selectedMenuIndex', index)
        .set('selectedMenuItem', itemFound)
        .set('selectedOpenedMenuIndex', openedIndex)
        .set('selectedOpenedMenuItem', itemOpenedFound);
    }
    case ActionTypes.OPEN_SETTING_DRAWER:
      return state.set('openSettingDrawer', true);
    case ActionTypes.CLOSE_SETTING_DRAWER:
      return state.set('openSettingDrawer', false);
    case ActionTypes.ANIMATE_MENUS: {
      let menus = state.get('menus');

      menus = menus.map((item) => {
        let newItem = item;

        if (item.children && item.children.length > 0) {
          if (item.id === action.menuId) {
            newItem = {
              ...item,
              animating: true,
              willCloseMenu: action.willCloseMenu,
            };
          } else {
            newItem = { ...item, animating: false };
          }

          newItem.children = newItem.children.map((child) => {
            let newChild = child;
            newChild = {
              ...child,
              animating: newItem.animating,
              willCloseMenu: newItem.willCloseMenu,
            };
            return newChild;
          });
        }

        return newItem;
      });

      return state.set('menus', menus);
    }
    case ActionTypes.TOGGLE_MENUS: {
      let menus = state.get('menus');

      menus = menus.map((item) => {
        let newItem = item;

        if (item.children && item.children.length > 0) {
          if (item.id === action.menuId) {
            newItem = { ...item, open: !item.open, animating: false };
          } else {
            newItem = { ...item, open: false, animating: false };
          }
        }

        return newItem;
      });

      return state.set('menus', menus);
    }
    case ActionTypes.ANIMATE_ROOT_MENUS: {
      let menus = state.get(action.rootMenuName);

      menus = menus.map((item) => {
        let newItem = item;

        newItem = {
          ...item,
          animatingRootMenu: true,
          willCloseRootMenu: action.willCloseMenu,
        };

        return newItem;
      });

      return state.set(action.rootMenuName, menus);
    }
    case ActionTypes.TOGGLE_ROOT_MENUS: {
      let menus = state.get(action.rootMenuName);

      menus = menus.map((item) => {
        let newItem = item;

        newItem = { ...item, animatingRootMenu: false };

        return newItem;
      });

      return state.set(action.rootMenuName, menus);
    }
    case CHANGE_LOCALE:
      console.log('in app reducer');
      return state;
    default:
      return state;
  }
}

export default appReducer;
