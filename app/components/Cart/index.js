import React from 'react';
import PropTypes from 'prop-types';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import { white, black } from 'material-ui/styles/colors';
import typography from 'material-ui/styles/typography';
import AutoComplete from 'material-ui/AutoComplete';
import ButtonSet from '../ButtonSet';
import CartList from '../CartList';

const Cart = ({ data, payment, subHeader }) => {
  const styles = {
    clearHeader: {
      fontSize: 16,
      fontWeight: typography.fontWeightMiddle,
      backgroundColor: white,
      color: black,
      lineHeight: '25px',

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
  const mainButtons = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['.', '0', '+/-'],
  ];

  const sideButtons = [
    ['عدد'],
    ['خصم'],
    ['سعر'],
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
      {subHeader}
      <AutoComplete
        hintText="يمكنك البحث باستخدام احرف او كلمات"
        dataSource={colors}
        onUpdateInput={handleUpdateInput}
        floatingLabelText="البحث "
        filter={AutoComplete.fuzzyFilter}
        fullWidth
        className={'search-box'}
        style={{ textIndent: 3, height: '53px' }}
        id={'cart-search-box'}

      />
      <CartList data={data} />
      <Divider inset />
      <Paper>
        <div className={'row cart-state'} >
          <Subheader style={styles.itemPropHeader} className={'row text-center'}>
            <span className={'header-item col-xs-3 col-md-3 col-lg-3'}>المجموع</span>
            <span className={'header-item col-xs-3 col-md-3 col-lg-3'}>الضريبة</span>
            <span className={'header-item col-xs-3 col-md-3 col-lg-3'}>الخصم</span>
            <span className={'header-item col-xs-3 col-md-3 col-lg-3'}>المجموع النهائي</span>
          </Subheader>
          <Subheader style={styles.itemPropHeader} className={'row text-center'}>
            <span className={'header-item col-xs-3 col-md-3 col-lg-3'}>13.0</span>
            <span className={'header-item col-xs-3 col-md-3 col-lg-3'}>5%</span>
            <span className={'header-item col-xs-3 col-md-3 col-lg-3'}>0%</span>
            <span className={'header-item col-xs-3 col-md-3 col-lg-3'}>19.5</span>
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
            label="الدفع"
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
  data: PropTypes.array,
  payment: PropTypes.func,
  subHeader: PropTypes.any,

};

export default Cart;
