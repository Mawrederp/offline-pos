/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';
import { localesDir } from '../../config/localization';
import {
  CHANGE_LOCALE,
  SET_LOCALE,
} from './constants';
import {
  DEFAULT_LOCALE,
} from '../App/constants'; // eslint-disable-line

const initialState = fromJS({
  locale: DEFAULT_LOCALE,
});

function languageProviderReducer(state = initialState, action) {
  let html = null;
  const storeLocale = (locale) => {
    html = document.getElementsByTagName('html')[0];
    html.lang = locale;
    html.dir = localesDir[locale];
    return state
      .set('locale', locale);
  };
  switch (action.type) {
    case SET_LOCALE:
      return storeLocale(action.locale);
    case CHANGE_LOCALE:
      return storeLocale(action.locale.get('locale'));
    default:
      return state;
  }
}

export default languageProviderReducer;
