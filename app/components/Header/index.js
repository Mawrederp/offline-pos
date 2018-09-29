import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { createStructuredSelector } from 'reselect';
import FontIcon from 'material-ui/FontIcon';
import * as appActions from '../../containers/App/actions';
import { makeSelectGlobal } from '../../containers/App/selectors';
import Theme from '../../config/theme';
import Styles from './styles';
import TabNav from './TabsNav';
import DateTimeLabel from '../DateTimeLabel';
const theme = new Theme();

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTheme: theme.get(props.appStore.currentTheme),
    };

    this.signOut = this.signOut.bind(this);
    this.openSettingsDrawer = this.openSettingsDrawer.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.appStore.currentTheme !== this.props.appStore.currentTheme) {
      this.setState({
        currentTheme: theme.get(newProps.appStore.currentTheme),
      });
    }
  }

  signOut() {
    this.props.actions.signOut();
  }
  openSettingsDrawer() {
    if (this.props.appStore.openSettingDrawer) {
      this.props.actions.closeSettingsDrawer();
    } else {
      this.props.actions.openSettingsDrawer();
    }
  }


  render() {
    const { styles, handleChangeRequestNavDrawer, appStore } = this.props;
    const style = Styles(appStore.isBoxedLayout, this.state.currentTheme);
    return (
      <div>
        <AppBar
          className="header"
          style={{ ...styles, ...style.appBar }}
          title={
            <div>
              {
                this.props.appStore.showTabs ? (
                  <TabNav
                    style={style}
                  ></TabNav>
                ) : null
              }
            </div>
          }
          iconElementLeft={
            <IconButton
              iconStyle={style.iconButton}
              style={style.menuButton}
              onClick={handleChangeRequestNavDrawer}
            >
              <FontIcon color={this.state.currentTheme.appBarMenuButtonColor} className="material-icons">menu</FontIcon>
            </IconButton>
          }
          iconElementRight={
            <div style={style.iconsRightContainer}>
              <DateTimeLabel
                style={{
                  color: 'white',
                  padding: 12,
                  verticalAlign: 'super',
                }}
              />
              <IconButton
                iconStyle={style.iconButton}
                onClick={this.openSettingsDrawer}
              >
                <FontIcon color={this.state.currentTheme.appBarMenuButtonColor} className="material-icons">settings</FontIcon>
              </IconButton>
              <IconMenu
                color={this.state.currentTheme.appBarMenuButtonColor}
                iconButtonElement={
                  <IconButton>
                    <FontIcon color={this.state.currentTheme.appBarMenuButtonColor} className="material-icons">power_settings_new</FontIcon>
                  </IconButton>
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                <MenuItem
                  primaryText={<FormattedMessage id={'app.actions.logout'} />}
                  onClick={this.signOut}
                />
              </IconMenu>
            </div>
          }
        />
      </div>
    );
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func,
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
