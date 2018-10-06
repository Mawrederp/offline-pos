import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { FormattedMessage } from 'react-intl';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs, Tab } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { getCurrentTheme } from '../../../containers/App/appUtils';
import * as appActions from '../../../containers/App/actions';
import { makeSelectGlobal } from '../../../containers/App/selectors';
import { scrollToMenuItemAndOpenViews } from '../../LeftDrawer/menuUtils';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.isNavigating = false;
    this.getTabsWidth = this.getTabsWidth.bind(this);
    this.navigateUrl = this.navigateUrl.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.appStore.selectedOpenedMenuIndex !==
      this.props.appStore.selectedOpenedMenuIndex) {
      if (!this.isNavigating) {
        setTimeout(() => {
          const index = nextProps.appStore.selectedOpenedMenuIndex;
          ReactDOM.findDOMNode(this.tabs).scrollLeft = ((index - 1) * 200) + 100; // eslint-disable-line
        }, 300);
      }
      this.isNavigating = false;
    }
  }

  getTabsWidth() {
    const totalOpenViews = this.props.appStore.openViews.length;

    return {
      width: (200 * (!totalOpenViews ? 1 : totalOpenViews)),
    };
  }

  handleClick = (menuItem, event) => {
    const x = event.pageX - event.currentTarget.getBoundingClientRect().left;
    const y = event.pageY - event.currentTarget.offsetTop;
    const id = event.currentTarget.getAttribute('data-id');

    if (x > 180 && y > 17 && y < 30 && id && id !== 'app.pages.dashboard') {
      const rootMenuItem = this.props.appStore.menus[0];
      this.navigateUrl(rootMenuItem);

      setTimeout(() => {
        this.props.actions.closeView(id);
      }, 300);
    } else {
      this.navigateUrl(menuItem);
    }
  };

  navigateUrl(menuItem) {
    this.isNavigating = true;
    browserHistory.push(menuItem.url);

    scrollToMenuItemAndOpenViews(menuItem, this.props.appStore.menus,
      this.props.appStore.openViews);
  }

  render() {
    const { style, appStore } = this.props;
    const theme = getCurrentTheme(appStore.currentTheme, appStore.isRtl);
    return (
      <Tabs
        TabIndicatorProps={{ style: { backgroundColor: theme.inkBar.backgroundColor } }}
        id="header-close-tabs"
        style={style.tabsScrollbars}
        value={appStore.selectedMenuItem ? appStore.selectedMenuItem.id : 0}
        ref={(tabs) => {
          this.tabs = tabs;
        }}
      >
        {
            appStore.openViews.length > 0 ?
              appStore.openViews.map((menu) => (
                <Tab
                  key={menu.id}
                  label={<FormattedMessage {...menu} />}
                  value={menu.id}
                  onClick={(evt) => this.handleClick(menu, evt)}
                />
                )
              ) : null
          }
      </Tabs>

    );
  }
}

Header.propTypes = {
  style: PropTypes.any,
  actions: PropTypes.any,
  appStore: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  appStore: makeSelectGlobal(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
