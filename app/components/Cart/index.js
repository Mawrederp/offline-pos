import React from 'react';
import PropTypes from 'prop-types';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import { injectIntl } from 'react-intl';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import {white, black, cyan600} from 'material-ui/styles/colors';
import typography from 'material-ui/styles/typography';
import AutoComplete from 'material-ui/AutoComplete';
import ButtonSet from '../ButtonSet';
import CartList from '../CartList';
import messages from './messages';

const Cart = ({ data, payment, subHeader, removeProduct, intl }) => {
  const styles = {
    clearHeader: {
      fontSize: 16,
      fontWeight: typography.fontWeightMiddle,
      backgroundColor: white,
      color: black,
      lineHeight: '25px',

    },
    subheader: {
      fontSize: 24,
      fontWeight: typography.fontWeightLight,
      backgroundColor: cyan600,
      color: white,
      lineHeight: '34px',
    },
    itemPropHeader: {
      padding: 0,
      lingHeight: '38px',
    },
  };
  const colors = [
    'احمر',
    'اصفر',
    'اسود',
    'اخضر',
    'Blue',
    'Purple',
    'Black',
    'White',
  ];
  const {
    quantityInit,
    discountInit,
    price,
    searchText,
    searchHint,
    cart,
    discount,
    subTotal,
    theTotal,
    toPay,
  } = messages;
  const mainButtons = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['.', '0', '+/-'],
  ];
  const sideButtons = [
    [intl.formatMessage(quantityInit)],
    [intl.formatMessage(discountInit)],
    [intl.formatMessage(price)],
    [<FontIcon className="material-icons" >backspace</FontIcon>],
  ];

  const handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  };
  const cashIcon = <FontIcon className="material-icons">money</FontIcon>;
  return (
    <Paper style={styles.container} className="cart">
      <Subheader style={styles.subheader}>
        {intl.formatMessage(cart)}
      </Subheader>
      <AutoComplete
        hintText={intl.formatMessage(searchHint)}
        dataSource={colors}
        onUpdateInput={handleUpdateInput}
        floatingLabelText={intl.formatMessage(searchText)}
        filter={AutoComplete.fuzzyFilter}
        fullWidth
        className={'search-box'}
        style={{ textIndent: 3, height: '53px' }}
        id={'cart-search-box'}

      />
      <CartList data={data} removeProduct={removeProduct} />
      <Divider inset />
      <Paper>
        <div className={'row cart-state'} >
          <Subheader style={styles.itemPropHeader} className={'row text-center'}>
            <span className={'header-item col-xs-4 col-md-4 col-lg-4'}>{intl.formatMessage(subTotal)}</span>
            {/* <span className={'header-item col-xs-4 col-md-4 col-lg-4'}>الضريبة</span>*/}
            <span className={'header-item col-xs-4 col-md-4 col-lg-4'}>{intl.formatMessage(discount)}</span>
            <span className={'header-item col-xs-4 col-md-4 col-lg-4'}>{intl.formatMessage(theTotal)}</span>
          </Subheader>
          <Subheader style={styles.itemPropHeader} className={'row text-center'}>
            <span className={'header-item col-xs-4 col-md-4 col-lg-4'}>{data.subTotal}</span>
            {/* <span className={'header-item col-xs-4 col-md-4 col-lg-4'}>{data.tax}%</span>*/}
            <span className={'header-item col-xs-4 col-md-4 col-lg-4'}>{data.discount}%</span>
            <span className={'header-item col-xs-4 col-md-4 col-lg-4'}>{data.total}</span>
          </Subheader>
        </div>
        <div className="buttons">
          <ButtonSet
            buttons={mainButtons}
            pressHandler={(label) => this.buttonPressHandler(label)}
            className="mainButtonMatrix"
          />
          <ButtonSet
            buttons={sideButtons}
            pressHandler={(label) => this.buttonPressHandler(label)}
            className="sideButtonMatrix"
          />
        </div>
      </Paper>
      <Paper zDepth={1}>
        <BottomNavigation style={{ height: '9vh' }} selectedIndex={0}>
          <BottomNavigationItem
            label={intl.formatMessage(toPay)}
            icon={cashIcon}
            onClick={payment}
            style={{ width: '100%' }}
          />
        </BottomNavigation>
      </Paper>
    </Paper>
  );
};

Cart.propTypes = {
  data: PropTypes.any,
  payment: PropTypes.func,
  subHeader: PropTypes.any,
  removeProduct: PropTypes.func,
  intl: PropTypes.any,
};

export default injectIntl(Cart);
