import { createSelector } from 'reselect';

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = () => (state) =>
  state.get('language').mergeDeep({ user: state.get('global').get('user') });
/**
 * Select the language locale
 */

const makeSelectLocale = () =>
  createSelector(
    selectLanguage(),
    (languageState) => languageState
  );

export { selectLanguage, makeSelectLocale };
