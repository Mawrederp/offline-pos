/**
 *
 * CartList
 *
 */

import React from 'react';
// import styled from 'styled-components';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';

import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import { grey400 } from 'material-ui/styles/colors';

import { Subheader } from 'material-ui';
import { injectIntl } from 'react-intl';
import messages from './messages';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  itemPropHeader: {
    padding: 0,
    lingHeight: '38px',
  },
};

function CartList({ data, style, noScroll, removeProduct, intl }) {
  const {
    thePrice,
    quantity,
    discount,
    tax,
    remove,
  } = messages;

  const iconButtonElement = (
    <IconButton
      touch
      tooltipPosition="bottom-left"
    >
      <FontIcon width="100%" color={grey400} className="material-icons">more_vert_icon</FontIcon>
    </IconButton>
  );
  const RightIconMenu = (payload) => (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem onClick={() => { removeProduct(payload); }}>{intl.formatMessage(remove)}</MenuItem>
    </IconMenu>
  );
  return (
    <List
      style={noScroll ? { paddingTop: 0, ...style } : {
        marginTop: '-13px',
        minHeight: '190px',
        maxHeight: '246px',
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingTop: 0,
        ...style,
      }}
    >
      {data.products.map((item) =>
        <div key={`${item.product.name}_${item.variantPropId}`}>
          <ListItem
            leftCheckbox={<Checkbox />}
            rightIconButton={RightIconMenu(item)}
            style={{ paddingTop: 19 }}
            className={'cart-list-item'}
          >
            <Subheader style={{ lineHeight: '12px' }} className={'row text-center'}>
              {item.product.name}
            </Subheader>
            <Subheader style={styles.itemPropHeader} className={'row text-center'}>
              <span className={'header-item col-xs-3 col-md-3 col-sm-3 col-lg-3'}>{intl.formatMessage(quantity)}</span>
              <span className={'header-item col-xs-3 col-md-3 col-sm-3 col-lg-3'}>{intl.formatMessage(thePrice)}</span>
              <span className={'header-item col-xs-3 col-md-3 col-sm-3 col-lg-3'}>{intl.formatMessage(discount)}</span>
              <span className={'header-item col-xs-3 col-md-3 col-sm-3 col-lg-3'}>{intl.formatMessage(tax)}</span>
            </Subheader>
            <Subheader style={styles.itemPropHeader} className={'row text-center'}>
              <span className={'header-item col-xs-3 col-md-3 col-lg-3'}>{item.quantity}</span>
              <span className={'header-item col-xs-3 col-md-3 col-lg-3'}>{item.price}</span>
              <span className={'header-item col-xs-3 col-md-3 col-lg-3'}>{item.product.discount}%</span>
              <span className={'header-item col-xs-3 col-md-3 col-lg-3'}>{item.product.tax}%</span>
            </Subheader>
          </ListItem>
          <Divider />

        </div>
      )}
    </List>
  );
}

CartList.propTypes = {
  data: PropTypes.any,
  style: PropTypes.object,
  noScroll: PropTypes.bool,
  removeProduct: PropTypes.func,
  intl: PropTypes.any,
};

export default injectIntl(CartList);
