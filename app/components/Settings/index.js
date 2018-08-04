import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
import { createStructuredSelector } from 'reselect';
import * as appActions from '../../containers/App/actions';
import { makeSelectGlobal } from '../../containers/App/selectors';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      closeSettingDrawnerOnce: false,
    };

    this.themeChanged = this.themeChanged.bind(this);
    this.closeSettingsDrawer = this.closeSettingsDrawer.bind(this);
    this.showTabsChanged = this.showTabsChanged.bind(this);
    this.openViewsChanged = this.openViewsChanged.bind(this);
    this.layoutChanged = this.layoutChanged.bind(this);
  }

  componentDidMount() {
    // Remove this conditional code if you don't want the settings drawer to display at load
    if (!this.props.isMobileBrowser) {
      setTimeout(() => {
        if (this.props.location.pathname === '/') {
          this.props.actions.openSettingsDrawer();
        }
      }, 3000);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== '/' &&
    !this.state.closeSettingDrawnerOnce) {
      this.setState({
        closeSettingDrawnerOnce: true,
      });
      this.props.actions.closeSettingsDrawer();
    }
  }

  themeChanged(e, newSelection) {
    this.props.actions.changeTheme(newSelection);
  }

  closeSettingsDrawer() {
    this.props.actions.closeSettingsDrawer();
  }

  showTabsChanged(e, newSelection) {
    this.props.actions.changeShowTabs(newSelection);
  }

  openViewsChanged(e, newSelection) {
    this.props.actions.changeShowOpenViews(newSelection);
  }

  layoutChanged(e, newSelection) {
    this.props.actions.changeLayout(newSelection);
  }

  render() {
    const { styles } = this.props;
    return (
      <Drawer
        openSecondary
        open={this.props.appStore.openSettingDrawer}
      >
        <AppBar
          title="Settings"
          style={styles.settingDrawer}
          iconElementLeft={
            <IconButton onClick={this.closeSettingsDrawer}>
              <FontIcon className="material-icons">close</FontIcon>
            </IconButton>
          }
        />
        <h2
          style={styles.headerItem}
        >
          THEME COLOR
        </h2>
        <RadioButtonGroup
          style={styles.themeOptions}
          name="themes"
          defaultSelected="darkBlueTheme"
          ref={(selectedTheme) => {
            this.selectedTheme = selectedTheme;
          }}
          onChange={this.themeChanged}
        >
          <RadioButton
            value="darkTheme"
            label="Dark Theme"
            style={styles.radioButton}
            labelStyle={styles.radioButtonLabel}
          />
          <RadioButton
            value="lightTheme"
            label="Light Theme"
            style={styles.radioButton}
            labelStyle={styles.radioButtonLabel}
          />
          <RadioButton
            value="blueTheme"
            label="Blue Theme"
            style={styles.radioButton}
            labelStyle={styles.radioButtonLabel}
          />
          <RadioButton
            value="grayTheme"
            label="Gray Theme"
            style={styles.radioButton}
            labelStyle={styles.radioButtonLabel}
          />
          <RadioButton
            value="darkBlueTheme"
            label="Dark Blue Theme"
            style={styles.radioButton}
            labelStyle={styles.radioButtonLabel}
          />
        </RadioButtonGroup>
        <h2
          style={styles.headerItem}
        >
          TABS
        </h2>
        <Toggle
          labelPosition={'right'}
          style={styles.swithStyle}
          label="Show Header Tabs"
          labelStyle={styles.swithColor}
          toggled={this.props.appStore.showTabs}
          onToggle={this.showTabsChanged}
        />
        <h2
          style={styles.headerItem}
        >
          OPEN VIEWS
        </h2>
        <Toggle
          labelPosition={'right'}
          style={styles.swithStyle}
          label="Show Open Views"
          labelStyle={styles.swithColor}
          toggled={this.props.appStore.showOpenViews}
          onToggle={this.openViewsChanged}
        />
        <h2
          style={styles.headerItem}
        >
          LAYOUT
        </h2>
        <Toggle
          labelPosition={'right'}
          style={styles.swithStyle}
          label="Boxed"
          labelStyle={styles.swithColor}
          toggled={this.props.appStore.isBoxedLayout}
          onToggle={this.layoutChanged}
        />
      </Drawer>
    );
  }
}

Settings.propTypes = {
  styles: PropTypes.any,
  actions: PropTypes.any,
  appStore: PropTypes.any,
  location: PropTypes.any,
  isMobileBrowser: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  appStore: makeSelectGlobal(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
