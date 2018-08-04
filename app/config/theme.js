import typography from 'material-ui/styles/typography';
import { white, lightBlue900, blue600, blueGrey900, blueGrey800 } from 'material-ui/styles/colors';

const themes = {
  darkTheme: {
    headerItemBoxShadow: 'rgb(26, 26, 26) 0px 5px 10px',
    logoBackgroundColor: blue600,
    logoColor: typography.textFullWhite,
    headerItemColor: '#a1a1a1',
    headerItemBackgroundColor: blueGrey900,
    headerItemFontWeight: '100',
    selectedMenuListItemColor: '#a1a1a1',
    selectedMenuListItemBackgroundColor: blueGrey800,
    selectedListItemColor: white,
    selectedListItemBackgroundColor: lightBlue900,
    menuItemColor: '#a1a1a1',
    avatarSpanColor: white,
    avatarSpanTextShadow: '1px 1px #444',
    appBarMenuButtonColor: white,
    settingsOptionsColor: white,
  },
  lightTheme: {
    headerItemBoxShadow: 'rgb(207, 207, 207) 0px 3px 5px',
    logoBackgroundColor: '#3399ff',
    logoColor: typography.textFullWhite,
    headerItemColor: '#6c6c6c',
    headerItemBackgroundColor: '#dbdbdb',
    headerItemFontWeight: 'bold',
    selectedMenuListItemColor: '#717171',
    selectedMenuListItemBackgroundColor: '#cccedb',
    selectedListItemColor: white,
    selectedListItemBackgroundColor: '#3399ff',
    menuItemColor: '#717171',
    avatarSpanColor: '#717171',
    avatarSpanTextShadow: '',
    appBarMenuButtonColor: '#717171',
    settingsOptionsColor: '#717171',
  },
  blueTheme: {
    headerItemBoxShadow: 'rgb(26, 26, 26) 0px 5px 10px',
    logoBackgroundColor: '#2d5f8b',
    logoColor: typography.textFullWhite,
    headerItemColor: white,
    headerItemBackgroundColor: '#2d5f8b',
    headerItemFontWeight: '100',
    selectedMenuListItemColor: '#c0dff5',
    selectedMenuListItemBackgroundColor: '#397fae',
    selectedListItemColor: white,
    selectedListItemBackgroundColor: '#d64635',
    menuItemColor: '#c0dff5',
    avatarSpanColor: '#c0dff5',
    avatarSpanTextShadow: '1px 1px #444',
    appBarMenuButtonColor: '#c0dff5',
    settingsOptionsColor: '#c0dff5',
  },
  grayTheme: {
    headerItemBoxShadow: 'rgb(26, 26, 26) 0px 5px 10px',
    logoBackgroundColor: '#4f5a67',
    logoColor: typography.textFullWhite,
    headerItemColor: white,
    headerItemBackgroundColor: '#4f5a67',
    headerItemFontWeight: '100',
    selectedMenuListItemColor: '#e9e9ea',
    selectedMenuListItemBackgroundColor: '#535f6d',
    selectedListItemColor: white,
    selectedListItemBackgroundColor: '#31c7b2',
    menuItemColor: '#e9e9ea',
    avatarSpanColor: '#e9e9ea',
    avatarSpanTextShadow: '1px 1px #444',
    appBarMenuButtonColor: '#e9e9ea',
    settingsOptionsColor: '#e9e9ea',

  },
  darkBlueTheme: {
    headerItemBoxShadow: 'rgb(26, 26, 26) 0px 5px 10px',
    logoBackgroundColor: '#2b3643',
    logoColor: typography.textFullWhite,
    headerItemColor: white,
    headerItemBackgroundColor: '#2b3643',
    headerItemFontWeight: '100',
    selectedMenuListItemColor: '#b4bcc8',
    selectedMenuListItemBackgroundColor: '#3e4b5c',
    selectedListItemColor: white,
    selectedListItemBackgroundColor: '#36c6d3',
    menuItemColor: '#b4bcc8',
    avatarSpanColor: '#b4bcc8',
    avatarSpanTextShadow: '1px 1px #444',
    appBarMenuButtonColor: '#b4bcc8',
    settingsOptionsColor: '#b4bcc8',
  },
};

class Theme {
  get(themeName) {
    return themes[themeName];
  }
}

export default Theme;
