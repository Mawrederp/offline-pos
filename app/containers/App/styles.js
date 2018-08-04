import { grey100 } from 'material-ui/styles/colors';
import { SMALL } from 'material-ui/utils/withWidth';

const paddingLeftDrawerOpen = 250;
const styles = (currentTheme, width, navDrawerOpen) => ({
  header: {
    paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0,
  },
  settingDrawer: {
    backgroundColor: currentTheme.logoBackgroundColor,
    color: currentTheme.logoColor,
  },
  container: {
    backgroundColor: grey100,
    margin: '44px 0px 0px 0px',
    paddingTop: 0,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: navDrawerOpen && width !== SMALL ? paddingLeftDrawerOpen : 20,
  },
  themeOptions: {
    paddingTop: 10,
    paddingLeft: 25,
  },
  radioButton: {
    marginBottom: 16,
  },
  radioButtonLabel: {
    color: currentTheme.settingsOptionsColor,
  },
  headerItem: {
    color: currentTheme.headerItemColor,
    fontSize: 14,
    backgroundColor: currentTheme.headerItemBackgroundColor,
    fontWeight: currentTheme.headerItemFontWeight,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  swithStyle: {
    paddingLeft: 25,
    width: 180,
  },
  swithColor: {
    color: currentTheme.settingsOptionsColor,
  },

});

export default styles;
