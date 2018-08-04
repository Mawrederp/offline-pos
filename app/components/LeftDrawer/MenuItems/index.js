import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListItem } from 'material-ui/List';
import { createStructuredSelector } from 'reselect';
import * as appActions from '../../../containers/App/actions';
import SelectableList from '../../SelectableList';
import { makeSelectGlobal } from '../../../containers/App/selectors';
import { findParentMenuItem } from '../menuUtils';

class MenuItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobileBrowser: props.isMobileBrowser,
      menusHasItems: true,
    };

    this.menuLoaded = false;
    this.handleMenusNestedListToggle = this.handleMenusNestedListToggle.bind(this);
    this.handleMenuItemsNestedListToggle = this.handleMenuItemsNestedListToggle.bind(this);
    this.animateMenu = this.animateMenu.bind(this);
    this.setMenuItemFocus = this.setMenuItemFocus.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.appStore.selectedMenuIndex !== this.props.appStore.selectedMenuIndex) {
      this.selectableMenuList.setSelectedIndex(newProps.appStore.selectedMenuIndex);
    }

    if ((newProps.appStore.menus.length > 0
      && newProps.appStore.menus.length === this.props.appStore.menus.length && !this.menuLoaded)
      || (this.menuLoaded && newProps.appStore.selectedMenuItem !== this.props.appStore.selectedMenuItem)) {
      this.menuLoaded = true;
      this.setMenuItemFocus(newProps.appStore.selectedMenuItem);
    }
  }

  setMenuItemFocus(menuItem) {
    const menus = this.props.appStore.menus;
    const menu = findParentMenuItem(menus, menuItem);

    if (menu && this[menu.id] && !this[menu.id].props.open) {
      this.handleMenuItemsNestedListToggle(this[menu.id]);
    }
  }

  handleMenusNestedListToggle = (item) => {
    if (!this.state.isMobileBrowser) {
      const rootMenuName = 'menus';
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
      menusHasItems: item.state.open,
    });
  }

  handleMenuItemsNestedListToggle = (item) => {
    if (!this.state.isMobileBrowser) {
      if (item.props.open) {
        this.props.actions.animateMenus(item.props['data-id'], true);
        setTimeout(() => {
          this.props.actions.toggleMenus(item.props['data-id']);
        }, 100);
      } else {
        this.props.actions.toggleMenus(item.props['data-id']);
        setTimeout(() => {
          this.props.actions.animateMenus(item.props['data-id'], false);
        }, 0);
      }
    }
  }

  animateMenu(menu, child) {
    let className = ' hide';

    if ((menu.open && child.animating && !menu.willCloseMenu) ||
    this.state.isMobileBrowser) {
      className = '';
    }
    return className;
  }

  render() {
    const { styles, isMobileBrowser, animateRootMenu, handleClickMenu } = this.props;

    return (
      <SelectableList
        className={`views-menu${isMobileBrowser ? '' : ' desktop-browser'}`}
        defaultValue={this.props.appStore.selectedMenuIndex}
        defaultItem={this.props.appStore.selectedMenuItem}
        ref={(selectableList) => {
          this.selectableMenuList = selectableList;
        }}
      >
        {
          this.props.appStore.menus.length > 0 ? (
            <ListItem
              value={-1}
              className="menu-text-color"
              primaryText="القوائم"
              style={styles.headerItem}
              open={this.state.menusHasItems}
              onNestedListToggle={this.handleMenusNestedListToggle}
              primaryTogglesNestedList
              nestedItems={this.props.appStore.menus.length > 0 ?
                this.props.appStore.menus.map((menu) =>
                  <ListItem
                    ref={(listItem) => {
                      this[menu.id] = listItem;
                    }}
                    className={`list-item${animateRootMenu({ open: this.state.menusHasItems }, menu)}`}
                    value={menu.index}
                    style={this.props.appStore.selectedMenuIndex === menu.index ? styles.selectedMenuListItem : styles.menuItem}
                    primaryText={menu.text}
                    leftIcon={menu.icon}
                    primaryTogglesNestedList={menu.children && menu.children.length > 0}
                    onClick={() => handleClickMenu(menu)}
                    onNestedListToggle={this.handleMenuItemsNestedListToggle}
                    open={menu.open}
                    data-id={menu.id}
                    data-url={menu.url}
                    nestedItems={menu.children && menu.children.length > 0 ?
                      menu.children.map((child) =>
                        <ListItem
                          className={`list-item${this.animateMenu(menu, child)}`}
                          value={child.index}
                          style={this.props.appStore.selectedMenuIndex === child.index ? styles.selectedMenuListItem : styles.menuItem}
                          primaryText={child.text}
                          onClick={() => handleClickMenu(child)}
                          data-id={child.id}
                          data-url={child.url}
                        />
                      ) : []}
                  />
                ) : []}
            />
          ) : (
            <span style={styles.loading}>Loading...</span>
          )
        }
      </SelectableList>
    );
  }
}

MenuItems.propTypes = {
  styles: PropTypes.any,
  actions: PropTypes.any,
  appStore: PropTypes.any,
  isMobileBrowser: PropTypes.bool,
  animateRootMenu: PropTypes.func,
  handleClickMenu: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  appStore: makeSelectGlobal(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuItems);
