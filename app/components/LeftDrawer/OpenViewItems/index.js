import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListItem } from 'material-ui/List';
import { createStructuredSelector } from 'reselect';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router';
import SelectableList from '../../SelectableList';
import * as appActions from '../../../containers/App/actions';
import { makeSelectGlobal } from '../../../containers/App/selectors';

class OpenViewItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openViewsHasItems: true,
    };

    this.handleOpenViewNestedListToggle = this.handleOpenViewNestedListToggle.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.appStore.selectedOpenedMenuIndex !== this.props.appStore.selectedOpenedMenuIndex &&
    this.props.appStore.showOpenViews) {
      this.selectableOpenViewList.setSelectedIndex(newProps.appStore.selectedOpenedMenuIndex);
    }
  }

  handleOpenViewNestedListToggle = (item) => {
    if (!this.state.isMobileBrowser) {
      const rootMenuName = 'openViews';
      if (!item.state.open) {
        this.props.actions.animateRootMenus(rootMenuName, true);
        setTimeout(() => {
          this.props.actions.toggleRootMenus(rootMenuName);
        }, 100);
      } else {
        this.props.actions.toggleRootMenus(rootMenuName);
        setTimeout(() => {
          this.props.actions.animateRootMenus(rootMenuName, false);
        }, 0);
      }
    }
    this.setState({
      openViewsHasItems: item.state.open,
    });
  }

  handleClickOpenViews(menuItem, event) {
    const x = event.pageX - event.currentTarget.offsetLeft;
    const y = event.pageY - event.currentTarget.getBoundingClientRect().top;
    const id = event.currentTarget.getAttribute('data-id');
    let minX = 188;
    let maxX = 215;
    const minY = 16;
    const maxY = 31;

    if (this.props.appStore.isBoxedLayout) {
      minX = 541;
      maxX = 567;
    }

    if (x > minX && x < maxX && y > minY && y < maxY && id && id !== 'dashboard') {
      this.props.actions.closeView(id);
    } else {
      this.props.handleClickMenu(menuItem);
    }
  }

  render() {
    const { styles, isMobileBrowser, animateRootMenu } = this.props;

    return (
      <SelectableList
        className={`open-views-menu${this.props.appStore.openViews.length > 0 &&
        this.props.appStore.openViews[0].animatingRootMenu ? ' animating' : ''}`}
        defaultValue={this.props.appStore.selectedOpenedMenuIndex}
        defaultItem={this.props.appStore.selectedOpenedMenuItem}
        ref={(selectableList) => {
          this.selectableOpenViewList = selectableList;
        }}
      >
        <ListItem
          value={-1}
          className="menu-text-color"
          primaryText="القوائم المفتوحة"
          style={styles.headerItem}
          open={this.state.openViewsHasItems}
          onNestedListToggle={this.handleOpenViewNestedListToggle}
          primaryTogglesNestedList
          nestedItems={this.props.appStore.openViews.length > 0 ?
            this.props.appStore.openViews.map((menu, index) =>
              (menu.id === 'dashboard' ? (
                <ListItem
                  className={`list-item ${this.props.appStore.selectedOpenedMenuIndex === index ? 'selected' : ''}
                  ${animateRootMenu({ open: this.state.openViewsHasItems }, menu)}`}
                  value={index}
                  style={this.props.appStore.selectedOpenedMenuIndex === index ? styles.selectedListItem : styles.menuItem}
                  primaryText={menu.text}
                  leftIcon={menu.icon}
                  onClick={(evt) => this.handleClickOpenViews(menu, evt)}
                  containerElement={
                    <Link to={menu.url}>``</Link>
                  }
                />
              ) : (
                <ListItem
                  className={`list-item open-views${isMobileBrowser ? '' : ' desktop-browser'} ${this.props.appStore.selectedOpenedMenuIndex === index ? 'selected' : ''}
                  ${animateRootMenu({ open: this.state.openViewsHasItems }, menu)}`}
                  value={index}
                  style={this.props.appStore.selectedOpenedMenuIndex === index ? styles.selectedListItem : styles.menuItem}
                  primaryText={menu.text}
                  leftIcon={menu.icon}
                  rightIcon={<FontIcon className="material-icons">close</FontIcon>}
                  onClick={(evt) => this.handleClickOpenViews(menu, evt)}
                  containerElement={<div className="close-tab" />}
                  data-id={menu.id}
                  data-url={menu.url}
                />
              )
            )) : []}
        />
      </SelectableList>
    );
  }
}

OpenViewItems.propTypes = {
  styles: PropTypes.any,
  actions: PropTypes.any,
  appStore: PropTypes.any,
  isMobileBrowser: PropTypes.bool,
  handleClickMenu: PropTypes.func,
  animateRootMenu: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  appStore: makeSelectGlobal(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenViewItems);
