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
import { grey400, cyan600, white, black } from 'material-ui/styles/colors';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Subheader } from 'material-ui';
import { NoPrint } from 'react-easy-print';

const iconButtonElement = (
  <IconButton
    touch
    tooltipPosition="bottom-left"
  >
    <FontIcon width="100%" color={grey400} className="material-icons">more_vert_icon</FontIcon>
  </IconButton>
);
const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>View</MenuItem>
  </IconMenu>
);
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
function CartList({ data, style, noScroll }) {
  return (
    <List style={noScroll ? { paddingTop: 0, ...style } : { marginTop: '-13px', maxHeight: '246px', overflowY: 'auto', overflowX: 'hidden', paddingTop: 0, ...style }}>
      {data.map((item) =>
        <div key={item.title}>
          <ListItem
            leftCheckbox={<NoPrint><Checkbox /></NoPrint>}
            rightIconButton={<NoPrint><rightIconMenu /></NoPrint>}
            style={{ paddingTop: 19 }}
          >
            <Subheader style={{ lineHeight: '12px' }} className={'row text-center'}>
              {item.title}
            </Subheader>
            <Subheader style={styles.itemPropHeader} className={'row text-center'}>
              <span className={'header-item col-xs-3 col-md-3 col-sm-3 col-lg-3'}>الكمية</span>
              <span className={'header-item col-xs-3 col-md-3 col-sm-3 col-lg-3'}>السعر</span>
              <span className={'header-item col-xs-3 col-md-3 col-sm-3 col-lg-3'}>الخصم</span>
              <span className={'header-item col-xs-3 col-md-3 col-sm-3 col-lg-3'}>الضريبة</span>
            </Subheader>
            <Subheader style={styles.itemPropHeader} className={'row text-center'}>
              <span className={'header-item col-xs-3 col-md-3 col-lg-3'}>1</span>
              <span className={'header-item col-xs-3 col-md-3 col-lg-3'}>3.10</span>
              <span className={'header-item col-xs-3 col-md-3 col-lg-3'}>0%</span>
              <span className={'header-item col-xs-3 col-md-3 col-lg-3'}>5%</span>
            </Subheader>
          </ListItem>
          <Divider />

        </div>
      )}
    </List>
  );
}

CartList.propTypes = {
  data: PropTypes.array,
  style: PropTypes.object,
  noScroll: PropTypes.bool,

};

export default CartList;
